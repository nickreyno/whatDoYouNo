import React, { Component } from "react";
import firebase from './firebase.js';

class Results extends Component {
	constructor() {
		super();

		this.state = {
			userName: [],
			userInput: '',
			score: 0,
		}
	}

	componentDidMount() {
		const dbRef = firebase.database().ref();

		dbRef.on('value', (response) => {
			const nameFromDb = response.val();

			const stateToBeSet = [];

			for (let key in nameFromDb) {
				const nameInfo = {
					key:key,
					name: nameFromDb[key],
				}
				stateToBeSet.push(nameInfo);
			}

			this.setState({
				userName: stateToBeSet,
				userInput: '',
			})
		})
	}

	handleNameChange = (event) => {
		this.setState ({
			userInput: event.target.value,
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const dbRef = firebase.database().ref();

		dbRef.push(this.state.userInput)

		this.setState ({
			userInput:'',
		})
	}

	render() {
		return (
			<div>
				<h3>Great work!</h3>
				<h4>Your Score:</h4>
				<p>SCORE GOES HERE FROM QUESTIONS</p>
				<p>result</p>

				<form 
				action="submit" 
				onSubmit = {this.handleSubmit}>
					<label htmlFor="enterName">Add your name to the leaderboard:</label>
					<input 
					type="text" 
					id="enterName"
					onChange={this.handleNameChange} />
					<button type="submit">Submit</button>
				</form>
			</div>
			);
	}
}

export default Results;
