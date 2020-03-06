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
import { easyWords, mediumWords, hardWords } from "./Components/library";

class App extends Component {
	constructor() {
		super();
		this.state = {
			words: []
		};
	}

	componentDidMount() {
		this.findRandomWord(easyWords);
	}

	getComparison = chosenWord => {
		axios({
			url: `http://api.datamuse.com/words?`,
			method: "GET",
			params: {
				rel_hom: chosenWord,
				md: "d"
			}
		}).then(response => {
			response = response.data;
			const wordsWithDefs = response.filter(word => {
				return word.defs;
			});
		});
	};

	// populate our call with a word from our local array

	findRandomWord = arrayToRandom => {
		const gameArray = [];

		for (let i = 1; i < 10; i++) {
			const randomNumber = Math.floor(Math.random() * arrayToRandom.length);

			const randomWord = arrayToRandom[randomNumber][0];

			gameArray.push(randomWord);
		}

		this.setState({
			words: gameArray
		});
	};

	// return homophones that inclue definitions

	// make a number randomiser (that takes an entry from our local array) take first [0] entry

	render() {
		return (
			<Router>
				<div className="wrapper">
					<header>
						<h1>What Do You No</h1>
						<Route path="/" exact>
							<h2>expand your vocabulary with homophones</h2>
							<Link className="mainButton" to="/questions">
								start game
							</Link>
						</Route>
					</header>
					<main>
						<Route path="/questions" component={Question} />
					</main>
					<footer></footer>
				</div>
			</Router>
		);
	}
}

export default App;
