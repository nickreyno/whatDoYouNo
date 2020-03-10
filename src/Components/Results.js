import React, { Component } from "react";
import firebase from "./firebase.js";
import "./Results.css";

class Results extends Component {
	constructor() {
		super();

		this.state = {			
			userInput: "",
		}
	}


	handleNameChange = event => {
		this.setState({
			userInput: event.target.value,
			userScore: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		const dbRef = firebase.database().ref();

		const leaderObject = {
			name: this.state.userInput,
			score: this.props.score,
			time: this.props.playerTime
		};

		dbRef.push(leaderObject);

		this.setState({
			userInput: ""
		});
	};

	render() {
		return (
			<div className="resultsCont">
				<h3 className="resultsHeader">great work!</h3>
					<div className="resultsScore">
						<h4>Your Score: {this.props.score}</h4>
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
					Add your name and score to the leaderboard: </label>
					<input 
					type="text" 
					id="enterName"
					className="ResultsInputName"
					value={this.state.userInput}
					onChange={this.handleNameChange} />
					<button 
					type="submit"
					className="resultsButton">Submit</button>

				</form>
				{/* end of form */}

				{/* start of dictionary */}
				<ul className="leaderDictionList">
					{this.props.rightWordsWrongAnswers.map((word, i) => {
						return (
							<li
								className="leaderDictionItem"
								key={i}
								>
								<span onClick={() => this.props.addToDictionary(this.props.rightWords[i], this.props.wrongAnswers[i])} className='rightWords'>{this.props.rightWords[i]} {this.props.wrongAnswers[i]}</span>

								<span onClick={() => this.props.addToDictionary(this.props.wrongWords[i], this.props.rightAnswers[i])} className='wrongWords'>{this.props.wrongWords[i]} {this.props.rightAnswers[i]}</span>
							</li>
						)
					})}
				</ul>
				{/* end of dictionary */}
</div>
			);

	}
}
	

export default Results;



// onClick = {() => {
// 	this.props.addToDictionary(resultWords.word1, resultWords.word2);
// }}