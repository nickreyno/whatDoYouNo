import React, { Component } from "react";
import firebase from "./firebase.js";

class Results extends Component {
	constructor() {
		super();

		this.state = {
			userInput: ""
		};
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
			// start of resultsCont
			<div className="resultsCont">
				<h3 className="resultsHeader">great work!</h3>
				<div className="resultsScore">
					<h4>Your Score: {this.props.score}</h4>
					<h4>Time (in secs): {this.props.playerTime}</h4>
				</div>

				{/* start of form */}
				<form action="submit" onSubmit={this.handleSubmit} className="resultsForm">
					<label htmlFor="enterName" className="resultsInput">
						Add your name and score to the leaderboard:
					</label>
					<input
						type="text"
						id="enterName"
						className="resultsInput"
						value={this.state.userInput}
						onChange={this.handleNameChange}
					/>
					<button className="resultsButton resultsInput" type="submit">
						Submit
					</button>
				</form>
				{/* end of form */}
				{/* start of dictionary */}
				<div className="addToDictionList">
					<h3>add words to your dictionary list by clicking on them</h3>
					<h4>right answers</h4>
					<h4>wrong answers</h4>

					<ul className="rightWordsList">
						{this.props.rightWords.map((word, i) => {
							return (
								<li className="addToDictionItem rightWords" key={i}
										onClick={() => this.props.addToDictionary(this.props.rightWords[i], this.props.wrongAnswers[i])}
									>
										<span>{this.props.rightWords[i]}</span> & <span>{this.props.wrongAnswers[i]}</span>

								</li>
							);
						})}
					</ul>
					<ul className="wrongWordsList">
						{this.props.wrongWords.map((word, i) => {
							return (
								<li className="addToDictionItem wrongWords" key={i}
										onClick={() => this.props.addToDictionary(this.props.wrongWords[i], this.props.rightAnswers[i])}
									>
										<span>{this.props.wrongWords[i]}</span> & <span>{this.props.rightAnswers[i]}</span>

								</li>
							);
						})}
					</ul>
				</div>

				{/* end of dictionary */}
			</div>
		);
	}
}

export default Results;

// onClick = {() => {
// 	this.props.addToDictionary(resultWords.word1, resultWords.word2);
// }}
