import React, { Component } from "react";
import firebase from './firebase.js';

class Results extends Component {
	constructor() {
		super();

		this.state = {
			leaderBInfo: [],
			userInput: "",
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
					time: nameFromDb[key].time,
				}
				stateToBeSet.push(nameInfo);
				stateToBeSet.sort((a, b)=>b.score - a.score);
			}

			this.setState({
				leaderBInfo: stateToBeSet,
			})
		})
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
			<div>
				<h3>Great work!</h3>
					<h4>Score: {this.props.score}</h4>
					<h4>Time (in secs): {this.props.playerTime}</h4>
				<form 
				action="submit" 
				onSubmit = {this.handleSubmit}>
					<label htmlFor="enterName">Add your name and score to the leaderboard:</label>
					<input 
					type="text" 
					id="enterName"
					value={this.state.userInput}
					onChange={this.handleNameChange} />
					<button type="submit">Submit</button>
				</form>

				<ul>
					{this.props.dictionaryWords.map((resultWords, i) =>{
						return(
						<li key={i}>{resultWords.word1} {resultWords.word2}</li>
						)
					})}
				</ul>

				<div >
					<h2>Leaderboard:</h2>
					<ul>
						{this.state.leaderBInfo.map((info,index) => {
							return (
								<li key={index.key}>
									<p>Name: {info.name}</p> 
									<p>Score: {info.score}</p>
									<p>Time: {info.time}</p>
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
