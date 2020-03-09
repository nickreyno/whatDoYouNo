import React, { Component, Fragment } from "react";
import { easyWords, mediumWords, hardWords } from "./library.js";
import question from "./question.css";
import axios from "axios";
import knowledge from "./assets/knowledge.webp"
import Preloader from "./Preloader.js";
import { Link } from "react-router-dom";

class Question extends Component {
	constructor(props) {
		super();

		this.state = {
			correctWord: "",
			definition: "",
			score: 0,
			questionNumber: 1,
			answers: [],
			buttons: [],
			timer: 0,
			gameOver: false,
			isLoading: true,
			error: false,
		};

		this.background = React.createRef();
		this.questionButtons = React.createRef();
	}

	//////////////////////////////////////////////////////////
	// -----------------make axios call---------------------//
	//////////////////////////////////////////////////////////
	componentDidMount() {
		this.getComparison(this.props.words[0]);
		this.startTimer();
	}

	//////////////////////////////////////////
	// -----------axios call----------------//
	//////////////////////////////////////////
	getComparison = chosenWord => {
		axios({
			url: `http://api.datamuse.com/words?`,
			method: "GET",
			params: {
				rel_hom: chosenWord,
				md: "d"
			}
		})
			///////////////////////////////////////////////////////////////////
			//------------to make sure if the word has definition-------------//
			////////////////////////////////////////////////////////////////////
			.then(response => {
				response = response.data;

				const wordsWithDefs = response.filter(word => {
					return word.defs
				});

				let randomNumberForDefs = 0

				if (wordsWithDefs[0].defs.length > 1) {
					randomNumberForDefs = Math.round(Math.random() * 1);
				}

				this.setState(
					{
						definition: wordsWithDefs[0].defs[randomNumberForDefs],
						correctWord: wordsWithDefs[0].word,
						isLoading: false,
					},
					() => {
						// ---randomize which button holds the correct answer---//
						this.formatDefinition();
						this.buttonRandomizer();
					}
				);
			})
			.catch(error => {
				this.setState({
					error: true,
				})
			});

		///////////////////////////////////////////////////////
		//------------ still need to work on it--------------///
		////////////////////////////////////////////////////////
		this.formatDefinition = () => {
			const defToBeFormatted = this.state.definition;
			const endSplice = defToBeFormatted.indexOf("/");
		};
	};

	startTimer = () => {
		const gameTime = setInterval(() => {
			if (this.state.gameOver === true) {
				clearInterval(gameTime);
			} else {
				this.setState({
					timer: this.state.timer + 1
				});
			}
		}, 1000);
	};

	//---When button is clicked, check if the answer is true or false and increase the score based on the answer and the question number goes up by 1 on every click---//
	handleClick = (theWord) => {
		if (this.state.questionNumber > 9) {
			this.setState(
				{
					gameOver: true,
					questionNumber: this.state.questionNumber + 1
				},
				() => {
					this.props.triggerResults(this.state.score, this.state.timer, this.state.answers);
					console.log("string pulled");
				}
			);
		} else if (theWord === true) {
			this.background.current.classList.toggle('correct');

			setTimeout(() => {
				this.background.current.classList.toggle('correct');

				const dictionary = [...this.state.answers];
				dictionary.push({
					word1: this.props.words[this.state.questionNumber - 1],
					correct: true,
					word2: this.state.correctWord
				});
				this.setState(
					{
						score: this.state.score + 1,
						questionNumber: this.state.questionNumber + 1,
						answers: dictionary
					},
					() => {
						// -- once the score and question number are set to the state, compare the value (the question number has to be the number minus 1 because array order starts from 0) --//
						this.getComparison(this.props.words[this.state.questionNumber - 1]);
					}
				);
			}, 500)

		} else {
			// -----the dictionary variable is to store wrong answers and show them to users at the end of the game-----//

			this.background.current.classList.toggle('incorrect')
			setTimeout(() => {
				this.background.current.classList.toggle('incorrect')

				const dictionary = [...this.state.answers];
				dictionary.push({
					word1: this.props.words[this.state.questionNumber - 1],
					correct: false,
					word2: this.state.correctWord
				});
				this.setState(
					{
						questionNumber: this.state.questionNumber + 1,
						answers: dictionary
					},
					() => {
						// -- once the score and question number are set to the state, compare the value (the question number has to be the number minus 1 because array order starts from 0) --//
						this.getComparison(this.props.words[this.state.questionNumber - 1]);
					}
				);
			}, 500)
		}
	};

	//----randomize the buttons so users don't know where the right answer button is----//
	buttonRandomizer = () => {
		const buttonsReadyForStates = [
			{
				word: this.props.words[this.state.questionNumber - 1],
				answer: false,
			},
			{
				word: this.state.correctWord,
				answer: true,
			}
		];

		//---every time the random number is 1, reverse the order of the array---//
		const randomQs = Math.round(Math.random() * 1);
		if (randomQs === 1) {
			buttonsReadyForStates.reverse();
		}
		this.setState({
			buttons: buttonsReadyForStates
		});
	};

	render() {
		return (
			<Fragment>
				{this.state.questionNumber < 11 ? (
					<div className="questionBox" ref={this.background}>
						<h2>Question {this.state.questionNumber}</h2>

						<div className="timer">
							<p>{this.state.timer} seconds</p>
						</div>

						{this.state.questionNumber > 1
							? <h3 className="scoreCounter">score: {this.state.score}</h3> : null}

						<div className="progressBar">
							<span style={{ width: `${this.state.questionNumber * 10}%` }}></span>
						</div>

						{this.state.isLoading ? <Preloader /> : null}

						<p className="definition">{this.state.definition}</p>

						<div className="buttonParent">
							{this.state.buttons.length > 0
								? this.state.buttons.map((button, i) => {
									return (
										<button
											key={i}
											ref={this.questionButtons}
											className="wordButton"
											onClick={() => {
												this.handleClick(button.answer);
											}}
										>
											{(button.word, button.word)}
										</button>
									);
								})
								: null}
							{this.state.error ? <div>
								<p className='errorText'>error retrieving. please play again</p>
								<Link to='/' className='wordButton'>go back home</Link>
							</div> : null}
						</div>
					</div>
				) : (
						<div className="questionBox">

							<h2 className="questionTitle">Congratulations!</h2>
							<img src={knowledge} alt="Shooting star reading 'the more you know'" className="questionImage" />

							<div className="buttonParent">
								<Link to='/' className='wordButton'>
									play again
								</Link>

								<Link to="/results" className="wordButton">
									Show Results
								</Link>
							</div>
						</div>
					)}
			</Fragment>
		);
	}
}

export default Question;

//----------pesudo code-------------//

// randomize which button is correct position stuff

// save if wrong
