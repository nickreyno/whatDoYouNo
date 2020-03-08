import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dictionary from "./Components/Dictionary.js";
import LeaderBoard from "./Components/LeaderBoard.js";
import Question from "./Components/Question.js";
import Results from "./Components/Results.js";
import StartScreen from "./Components/StartScreen.js";
import "./App.css";
import axios from "axios";
import library from "./Components/library";
import firebase from "./Components/firebase.js";
import { easyWords, mediumWords, hardWords } from "./Components/library";

class App extends Component {
	constructor() {
		super();
		this.state = {
			words: [],
			playserScore: '',
			dictionary: [],
			timer: ''
		};
	}

	componentDidMount() {
		this.randomizer(easyWords);
	}

	// populate our call with a word from our local array

	randomizer = arrayToRandom => {
		const gameArray = [];
		// let randomNumber = 0;
		for (let i = 0; i < 10; i++) {
			const randomNumber = Math.floor(Math.random() * arrayToRandom.length);
			gameArray.push(arrayToRandom[randomNumber][0]);
			arrayToRandom.splice(randomNumber, 1);
		}

		this.setState({
			words: gameArray
		});
	};

// sets state in App to check what question 
displayResults = (score, timer, words) =>{
	this.setState({
		playserScore: score,
		gameOver: true,
		dictionary: words,
		timer: timer,
	}, () =>{window.location.replace('/results')}
	)  
	
}

	render() {
		return (
			<Router>
				<div className="wrapper">
					<header>
						<Link to="/">
							<h1>What Do You No</h1>
						</Link>
						<Route path="/" exact>
							<h2>expand your vocabulary with homophones</h2>
							<Link className="mainButton" to="/questions">
								start game
							</Link>
						</Route>
					</header>
					<main>
							
						<Route path="/questions">
							<Question words={this.state.words} triggerResults={this.displayResults} />

						</Route>
						<Route path="/results">
							<Results score={this.state.playserScore} dictionaryWords={this.state.dictionary} playerTime={this.state.timer} />
						</Route>
							
					</main>
					<footer></footer>
				</div>
			</Router>
		);
	}
}

export default App;
