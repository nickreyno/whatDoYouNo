import React, { Component } from "react";
import { easyWords, mediumWords, hardWords } from "./library.js";
import question from './question.css'
import axios from "axios";

class Question extends Component {
	constructor() {
		super();

		this.state = {
			correctWord: "",
			definition: "",
			score: 0,
			questionNumber: 1,
			wrongAnswers: [],
			buttons: []
		};
	}
	//////////////////////////////////////////////////////////
	// -----------------make axios call---------------------//
	//////////////////////////////////////////////////////////
	componentDidMount() {
		this.getComparison(this.props.words[0]);
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
					return word;
				});
				this.setState(
					{
						definition: wordsWithDefs[0].defs[0],
						correctWord: wordsWithDefs[0].word
					},
					() => {

						// ---randomize which button holds the correct answer---//
						this.formatDefinition();
						this.buttonRandomizer();
					}
				);
			})
			.catch(error => {
				console.log(error, "you gooft it");
			});

			///////////////////////////////////////////////////////
			//------------ still need to work on it--------------///
			////////////////////////////////////////////////////////
		this.formatDefinition = () => {
			const defToBeFormatted = this.state.definition;
			const endSplice = defToBeFormatted.indexOf("/");
		};
	};

	//---When button is clicked, check if the answer is true or false and increase the score based on the answer and the question number goes up by 1 on every click---//
	handleClick = theWord => {
		if (this.state.questionNumber >= 10) {
			console.log("its OVER");
		} else if (theWord === true) {
			this.setState(
				{
					score: this.state.score + 1,
					questionNumber: this.state.questionNumber + 1
				},
				() => {

					// -- once the score and question number are set to the state, compare the value (the question number has to be the number minus 1 because array order starts from 0) --//
					this.getComparison(this.props.words[this.state.questionNumber - 1]);
				}
			);
		} else {
			// -----the dictionary variable is to store wrong answers and show them to users at the end of the game-----//
			const dictionary = [...this.state.wrongAnswers];
			dictionary.push(this.props.words[this.state.questionNumber]);
			this.setState(
				{
					questionNumber: this.state.questionNumber + 1,
					wrongAnswers: dictionary
				},
				() => {
                // -- once the score and question number are set to the state, compare the value (the question number has to be the number minus 1 because array order starts from 0) --//
                this.getComparison(
                  this.props.words[this.state.questionNumber - 1]
                );
              }
			);
		}
	};

	//----randomize the buttons so users don't know where the right answer button is----//
	buttonRandomizer = () =>{
		const buttonsReadyForStates =  [{
			word: this.props.words[this.state.questionNumber - 1],
			answer: false,
		},
			{
			word: this.state.correctWord,
			answer: true,
		}] 

		//---every time the random number is 1, reverse the order of the array---//
		const randomQs = Math.round(Math.random() * 1);
		if (randomQs === 1) {
			buttonsReadyForStates.reverse();
		}
		this.setState({
			buttons: buttonsReadyForStates
		})
	}

	render() {
		return (
			<div className="questionBox">
				<h2>Question {this.state.questionNumber}</h2>

				<div className='progressBar'>
					<span style={{ width: `${this.state.questionNumber * 10}%` }}></span>
				</div>

				<p className='definition'>{this.state.definition}</p>

				{this.state.questionNumber > 1 ? <p>Your current score is : {this.state.score}</p> : null}
				<div className='buttonParent'>
					{this.state.buttons.length > 0 ? 
						this.state.buttons.map((button,i) => {
							return(
							<button
								key={i}
								className='wordButton'
								onClick={() => {
									this.handleClick(button.answer);
								}}
							>
								{button.word, button.word}
							</button>
							)
						})
					: null}
				</div>
			</div>
		);
	}
}

export default Question;



//----------pesudo code-------------//

// randomize which button is correct position stuff

// save if wrong
