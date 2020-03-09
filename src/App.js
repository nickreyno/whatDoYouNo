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
			playerScore: "",
			dictionary: [],
			timer: "",
			entries: ["fir", "fur", "dear", "deer", "medal", "flee", "weather", "large"],
			levelSelected: false
		};
	}

	// populate our call with a word from our local array

	randomizer = arrayToRandom => {
		const gameArray = [];

		const game = [...arrayToRandom];

		for (let i = 0; i < 10; i++) {
			const randomNumber = Math.floor(Math.random() * game.length);

			gameArray.push(game[randomNumber][0]);

			game.splice(randomNumber, 1);
		}

		this.setState({
			words: gameArray,
			levelSelected: true
		});
	};

	// sets state in App to check what question
	displayResults = (score, timer, words) => {
		// console.log(words);
		this.setState({
			playerScore: score,
			gameOver: true,
			dictionary: words,
			timer: timer
		});
	};

	addToDictionary = (word1, word2) => {
		
	};

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

							<div className="buttonContainer">
								<button onClick={() => this.randomizer(easyWords)}>easy</button>
								<button onClick={() => this.randomizer(mediumWords)}>medium</button>
								<button onClick={() => this.randomizer(hardWords)}>hard</button>
							</div>

							{this.state.levelSelected ? (
								<Link className="mainButton" to="/questions">
									start game
								</Link>
							) : null}
						</Route>
					</header>
					<main>
						<Route path="/questions">
							<Question words={this.state.words} triggerResults={this.displayResults} />
						</Route>
						<Route path="/results">
							<Results
								score={this.state.playerScore}
								dictionaryWords={this.state.dictionary}
								playerTime={this.state.timer}
								addToDictionary={this.addToDictionary}
							/>
						</Route>
						<Link to="/dictionary">dictionary please</Link>
						<Route path="/dictionary">
							<Dictionary entries={this.state.entries} />
						</Route>
					</main>
					<footer></footer>
				</div>
			</Router>
		);
	}
}

export default App;
