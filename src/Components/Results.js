import React, { Component } from "react";
import firebase from './firebase.js';

class Results extends Component {
	constructor() {
		super();

		this.state = {
			
			userInput: "",
		}
	}

	handleNameChange = (event) => {
		this.setState ({
			userInput: event.target.value,
			userScore: event.target.value,
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const dbRef = firebase.database().ref();

		const leaderObject = {
			name: this.state.userInput,
			score: this.props.score,
			time: this.props.playerTime,
		}

		dbRef.push(leaderObject)

		this.setState ({
			userInput: "",
		}
		)
	}

	render() {
		return (
			<div className="leaderDiv">
				<h3 className="leaderHeader">Great work!</h3>
					<div className="leaderScore">
						<h4 className="score">Your Score:{this.props.score}</h4>
						<h4>Time (in secs): {this.props.playerTime}</h4>

					</div>

				{/* start of form */}
				<form 
				action="submit" 
				onSubmit = {this.handleSubmit}
				className="leaderForm">
					<label 
					htmlFor="enterName"
					className="leaderLabelName">
					Add your name and score to the leaderboard:</label>
					<input 
					type="text" 
					id="enterName"
					className="leaderInputName"
					value={this.state.userInput}
					onChange={this.handleNameChange} />
					<button 
					type="submit"
					className="leaderButton">Submit</button>
				</form>
				{/* end of form */}

				{/* start of dictionary */}
				<ul className="leaderDictionList">
					{this.props.dictionaryWords.map((resultWords, i) =>{
						return(
						<li 
						className="leaderDictionItem"
						key={i}>{resultWords.word1} {resultWords.word2}</li>
						)
					})}
				</ul>
				{/* end of dictionary */}
</div>
			);
	}
}

export default Results;
