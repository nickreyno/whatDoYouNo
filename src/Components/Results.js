import React, { Component } from "react";
import firebase from './firebase.js';

class Results extends Component {
	constructor() {
		super();

		this.state = {
			leaderBInfo: [],
			userInput: "",
			userScore: 0,
		}
	}

	// sort function
		// from highest to lowest 
	// push object w user name and score 
	// map that shit 


	componentDidMount() {
		const dbRef = firebase.database().ref();

		dbRef.on("value", (response) => {
			const nameFromDb = response.val();

			const stateToBeSet = [];

			for (let key in nameFromDb) {
				const nameInfo = {
					key:key,
					name: nameFromDb[key].name,
					score: nameFromDb[key].score,
				}
				stateToBeSet.push(nameInfo);
			}

			this.setState({
				leaderBInfo: stateToBeSet,
			})
		})
	}

	showResultsButton = () => {

	}

	handleNameChange = (event) => {
		this.setState ({
			userInput: event.target.value,
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const dbRef = firebase.database().ref();

		const leaderObject = {
			name: this.state.userInput,
			score: this.state.userScore,
		}

		dbRef.push(leaderObject)

		this.setState ({
			userInput: "",
		})

		console.log(this.userInput)
	}

	render() {
		return (
			<div>
				<h3>Great work!</h3>
				<h4>Your Score:</h4>
				<p>SCORE GOES HERE FROM QUESTIONS</p>

				<form 
				action="submit" 
				onSubmit = {this.handleSubmit}>
					<label htmlFor="enterName">Add your name to the leaderboard:</label>
					<input 
					type="text" 
					id="enterName"
					value={this.state.userInput}
					onChange={this.handleNameChange} />
					<button type="submit">Submit</button>
				</form>

				<div>
					<h2>Leaderboard:</h2>
					<ul>
						{this.state.leaderBInfo.map((info,index) => {
							return (
								<li key={index.key}>
									<p>Name: {info.name} Score: {info.score} </p>
								</li>
							)
						})}

					</ul>
				</div>
			</div>
			);
	}
}

export default Results;
