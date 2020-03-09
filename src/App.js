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
import ToggleBttn from "./ToggleBttn.js";

class App extends Component {
	constructor() {
		super();
		this.state = {
			words: [],
			playerScore: "",
			dictionary: [],
			timer: "",
			entries: ["blue", "very", "large"],
			levelSelected: false,
			leaderBInfo: [],
			visible: false,
			levelButton: ""
		};

		this.levelButton = React.createRef();
	}

	// populate leaderboard with data from FB
	componentDidMount() {
		const dbRef = firebase.database().ref();

		dbRef.on("value", response => {
			const nameFromDb = response.val();

			const stateToBeSet = [];

			for (let key in nameFromDb) {
				const nameInfo = {
					key: key,
					name: nameFromDb[key].name,
					score: nameFromDb[key].score,
					time: nameFromDb[key].time
				};
				stateToBeSet.push(nameInfo);
				stateToBeSet.sort((a, b) => b.score - a.score);
			}

			this.setState({
				leaderBInfo: stateToBeSet
			});
		});
	}

	// toggle leaderboard

	handleMouseDown = e => {
		this.toggleLeaderB();
		console.log("clicked");
		e.stopPropagation();
	};

	toggleLeaderB = () => {
		this.setState({
			visible: !this.state.visible
		});
	};

	// populate our call with a word from our local array

	randomizer = (arrayToRandom, clickedButton) => {
		if (this.state.levelButton) {
			this.state.levelButton.classList.remove("levelSelected");
		}

		this.setState(
			{
				levelButton: this.levelButton.current.childNodes[clickedButton]
			},
			() => {
				this.state.levelButton.classList.add("levelSelected");
			}
		);

		const gameArray = [];

		const game = [...arrayToRandom];

		for (let i = 0; i < 10; i++) {
			const randomNumber = Math.floor(Math.random() * game.length);

			const randomNumberForWord = Math.round(Math.random() * 1);

			gameArray.push(game[randomNumber][randomNumberForWord]);

			game.splice(randomNumber, 1);
		}

		this.setState({
			words: gameArray,
			levelSelected: true
		});
	};

	// sets state in App to check what question
	displayResults = (score, timer, words) => {
		this.setState({
			playerScore: score,
			gameOver: true,
			dictionary: words,
			timer: timer
		});
	};

	addToDictionary = (word1, word2) => {
		const entriesToMod = [...this.state.entries];
		entriesToMod.push(word1, word2);
		const uniqueEntries = entriesToMod.filter((item, index, originalArray) => {
			return originalArray.indexOf(item) === index;
		});
		console.log(uniqueEntries);
		this.setState({
			entries: uniqueEntries
		});
	};

	render() {
		return (
			<Router>
				<div className="wrapper">
					<header>
						<Link to="/">
							<h1>What Do You No</h1>
						</Link>
					</header>

					<main>
						<Route path="/" exact>
							<h2>Expand Your Vocabulary with Homophones</h2>

							<p className="homophoneDef">
								A <span className="homophoneItalic">homophone</span> is one of two or more words that are pronounced the
								same, but are different in meaning. <span className="homophoneItalic">Two, to</span> and{" "}
								<span className="homophoneItalic">too</span> are homophones, along with{" "}
								<span className="homophoneItalic">presents</span> and <span className="homophoneItalic">presence</span>.
							</p>

							<h2 className="instructions">Instructions</h2>

							<p className="homophoneDef">
								Select your level of difficulty below and click start. Click on the word that matches the definition
								shown. Your number of correct answers and time determine your place on the leaderboard! Good luck!
							</p>

							<div ref={this.levelButton} className="buttonContainer">
								<button onClick={() => this.randomizer(easyWords, 0)}>easy</button>
								<button onClick={() => this.randomizer(mediumWords, 1)}>medium</button>
								<button onClick={() => this.randomizer(hardWords, 2)}>hard</button>
							</div>

							{this.state.levelSelected ? (
								<Link className="mainButton" to="/questions">
									start game
								</Link>
							) : null}
						</Route>

						<ToggleBttn handleMouseDown={this.handleMouseDown} />


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

					<aside>
						<LeaderBoard
							leaderBInfo={this.state.leaderBInfo}
							handleMouseDown={this.handleMouseDown}
							leaderBVisibility={this.state.visible}
						/>
					</aside>

					<footer></footer>
				</div>
			</Router>
		);
	}
}

export default App;
