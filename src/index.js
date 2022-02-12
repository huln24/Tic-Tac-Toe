import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square is class of type React component
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
        // Whenever button is clicked re-render Square
        <button 
            className="square" 
            onClick={() => this.setState({value: 'X'})}
            > 
          {this.state.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    renderSquare(i) {
        // Passing value to Square class
      return <Square value={this.state.squares[i]} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );