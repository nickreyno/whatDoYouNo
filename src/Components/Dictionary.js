import React, { Component } from "react";
import axios from "axios";
import dictionary from "./dictionary.css";

class Dictionary extends Component {
	constructor() {
		super();

		this.state = {
			entries: []
		};
	}

	componentDidMount() {
		this.getDefinition(this.props.entries);
	}

	getDefinition = entries => {
		for (let i = 0; i < this.props.entries.length; i++) {
			axios({
				url: `http://api.datamuse.com/words?`,
				method: "GET",
				params: {
					sp: entries[i],
					md: "dp"
				}
			})
				//------------to make sure if the word has definition-------------//
				.then(response => {
					response = response.data;
					console.log(response)
					const entriesForModding = [...this.state.entries];
					const currentEntry = {
						word: entries[i],
						def: response[0].defs[0]					}
					entriesForModding.push(currentEntry);
					// console.log(entriesForModding);
				})
				.catch(error => {
					console.log(error, "you gooft it");
				});

			//------------ still need to work on it--------------///
			this.formatDefinition = () => {
				const defToBeFormatted = this.state.definition;
				const endSplice = defToBeFormatted.indexOf("/");
			};
		}
	};

	render() {
		return (
			<section className="dictionarySection">
				<h2>my dictionary</h2>
				<p>{this.props.entries}</p>
			</section>
		);
	}
}

export default Dictionary;
// 