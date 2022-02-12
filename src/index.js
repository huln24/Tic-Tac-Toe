import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// This function replaces Class Square below
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

/*
// Square is class of type React component
// Is a controlled component since its is under control of Board
class Square extends React.Component {
    // When calling constructor of a subclass need to call super
    // All reac
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
      return (
        // On click, function after this expression will be executed() =>
        // set up onClick() event listener
        // Square will call onClick() of Board
        // Whenever button is clicked re-render Square
        // props is the paase argument
        <button 
            className="square" 
            onClick={() => this.props.onClick()}
            > 
            {this.props.value}
        </button>
      );
    }
  }
  */
  
  class Board extends React.Component {
    renderSquare(i) {
      // Passing props to Square class
      // State of the square
      // onClick, so that Square can call this function
      return (<Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
      constructor(props) {
          super(props);
          this.state = {
              history: [{
                  squares: Array(9).fill(null),
              }],
              xIsNext: true,
              stepNumber: 0,
          };
      }

    handleClick(i) {
        // slice() return shallow copy of squares in consrtuctor
        // Hence we're not modifying directly the squares array
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext? 'X' : 'O';
        this.setState({
            // concat() method doesn't mutate the original array
            // compared to push() method
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }  

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    // Renders HTML to webpage
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        // Move => current history element index
        // Step => current history element value
        const moves = history.map((step, move) => {
            const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            // Lists past moves in order 
            // And each list item is clickable
            // Use of key for each list time makes
            // React easy to searches previous list items for matching key
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            ); 
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
        }  
        return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
      const lines = [
          [0, 1, 2],
          [0, 3, 6],
          [0, 4, 8],
          [1, 4, 7],
          [2, 5, 8],
          [3, 4, 5],
          [6, 7, 8],
          [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  /* In JavaScript,
        functions are first-class objects:
            - they can be stored in a variable, object or array
            - passed as an argument to a function
            - returned from a function 
            
        Arrays have map() method 
            - Maps data to other data*/


  /* The DOM <button> element’s onClick attribute has a special 
  meaning to React because it is a built-in component. 
  For custom components like Square, the naming is up to you. 
  We could give any name to the Square’s onClick prop or Board’s 
  handleClick method, and the code would work the same. In React,
  it’s conventional to use on[Event] names for props which represent
  events and handle[Event] for the methods which handle the events. */

  /* Two approaches to changing data:
        1. Mutate the data: directly change the value
            var player = {score: 1, name: 'Jeff'};
            player.score = 2;
        2. Replace data with new copy with chaged data (immutability)
            var player = {score: 1, name: 'Jeff'};

            var newPlayer = Object.assign({}, player, {score: 2});

        Immutability is important because:
        - We can have previous version of data in case we want to re-visit it
        - We can detect the change easily, just by comparing
        - Help create pure components in React, help 
            determine when component requires re-rendering.     
         */

/*  When a list is re-rendered, React takes each list item’s key 
and searches the previous list’s items for a matching key. If the
current list has a key that didn’t exist before, React creates a 
component. If the current list is missing a key that existed in the 
previous list, React destroys the previous component. If two keys 
match, the corresponding component is moved. Keys tell React about 
the identity of each component which allows React to maintain state 
between re-renders. If a component’s key changes, the component will 
be destroyed and re-created with a new state.

t’s strongly recommended that you assign proper keys whenever you build 
dynamic lists. If you don’t have an appropriate key, you may want to 
consider restructuring your data so that you do.

If no key is specified, React will present a warning and use the array 
index as a key by default. Using the array index as a key is 
problematic when trying to re-order a list’s items or 
inserting/removing list items.

Keys do not need to be globally unique; they only need to be unique 
between components and their siblings.
*/        