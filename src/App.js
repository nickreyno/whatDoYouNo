import React, { Component, Fragment } from "react";
import Dictionary from "./Components/Dictionary.js";
import LeaderBoard from "./Components/LeaderBoard.js";
import Question from "./Components/Question.js";
import Results from "./Components/Results.js";
import StartScreen from "./Components/StartScreen.js";
import "./App.css";
import axios from 'axios'
import library from './Components/library'
import { easyWords, mediumWords, hardWords } from './Components/library'

class App extends Component {

constructor(){
	super();
	this.state ={
		words: []
	}
}

componentDidMount(){
	axios({
		url: `http://api.datamuse.com/words?`,
		method: 'GET',
		params: {
			rel_hom: 'selectedWordFromLocalArray',
			md: 'd',

		}
	}).then(response =>{
		console.log(response);
	})
}

// populate our call with a word from our local array

findRandomWord = () =>{
	for (let i = easyWords.length - 1; i > 0; i--) {
        const getRandomNumber = Math.floor(Math.random() * (i + 1));
        [easyWords[i], easyWords[getRandomNumber]] = [easyWords[getRandomNumber], easyWords[i]];
	};
	
	const selectedWordFromLocalArray = easyWords[0][0];
	console.log(selectedWordFromLocalArray);
	
}





// return homophones that inclue definitions 

// make a number randomiser (that takes an entry from our local array) take first [0] entry

	render() {
		
		return (

			<Fragment>
				<div className ="wrapper">
					<header>
						<h1>What Do You No</h1>
						<h2>expand your vocabulary with homophones</h2>
						<button onClick={this.findRandomWord}>start game</button>
					</header>
				<main>
					<Question/>
				</main>
				<footer></footer>
				
				</div>
			</Fragment>
		);
	}
}

export default App;
