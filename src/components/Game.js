import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils';

import './Game.scss';

export default function Game(props) {
	const [history, setHistory] = useState([
		{
			squares: Array(9).fill(null)
		}
	]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXIsNext] = useState(true);

	function handleSquareClick(i) {
		const curHistory = history.slice(0, stepNumber + 1);
		const current = curHistory[curHistory.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
	    	return;
	    }

		squares[i] = xIsNext ? 'X' : 'O';

		setHistory(curHistory.concat([{ squares: squares }]));
		setStepNumber(curHistory.length);
		setXIsNext(!xIsNext);
	}

	function jumpTo(step) {
		setStepNumber(step);
		setXIsNext(step % 2 === 0);
	}

	const current = history[stepNumber];
	const winner = calculateWinner(current.squares);
	let status;
    if (winner) {
		status = 'Winner: ' + winner;
    } else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
		const desc = move ?
		'Go to move #' + move :
		'Go to game start';

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
    });

	return (
		<div className="game">
	        <div className="game-board">
	        	<Board
	            	squares={current.squares}
	            	onClick={handleSquareClick}
	        	/>
	        </div>
	        <div className="game-info">
	        	<div>{status}</div>
	        	<ol>{moves}</ol>
	        </div>
    	</div>
	)
}