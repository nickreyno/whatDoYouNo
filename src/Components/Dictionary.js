import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Dictionary extends Component {
	constructor() {
		super();

		this.state = {
			entries: [],
			entriesFormatted: [],
			iteration: 0
		};
	}

	// on mount make axios call to get definitions
	componentDidMount() {
		this.setState(
			{
				entries: this.props.entries
			},
			() => {
				this.getDefinition(this.state.entries, this.state.iteration);
			}
		);
	}

	getDefinition = (entries, iteration) => {
		axios({
			url: `http://api.datamuse.com/words?`,
			method: "GET",
			params: {
				sp: entries[iteration],
				md: "dp"
			}
		})
			.then(response => {
				response = response.data;
				const entriesForModding = [...this.state.entriesFormatted];
				const currentEntry = {
					word: entries[iteration],
					def: response[0].defs[0]
				};

				// logic to separate the 'n / v / adj ' portion from the definition to style it differently
				currentEntry.def = currentEntry.def.split("\t");
				currentEntry.def[0] = currentEntry.def[0] + " ";
				entriesForModding.push(currentEntry);
				console.log(entriesForModding);
				this.setState(
					{
						entriesFormatted: entriesForModding,
						iteration: this.state.iteration + 1
					},
					() => {
						if (this.state.iteration < this.state.entries.length) {
							this.getDefinition(this.state.entries, this.state.iteration);
						} else {
							return;
						}
					}
				);
			})
			.catch(error => {
				console.log(error, "you gooft it");
			});
	};

	render() {
		return (
			<section className="dictionarySection">
				<h2>my dictionary</h2>
				<Link className="goHome mainButton" to="/whatDoYouNo/">
					Go Home
				</Link>
				{this.state.entriesFormatted.length > 0 ? (
					<ul>
						{this.state.entriesFormatted.map((item, i) => {
							return (
								<li key={i}>
									<h3>{item.word}</h3>
									<p>
										<span className="wordType">{item.def[0]} </span>
										{item.def[1]}
									</p>
								</li>
							);
						})}
					</ul>
				) : (
					<p className="emptyDictionary">Add words from the results page to see their definitions displayed here!</p>
				)}
			</section>
		);
	}
}

export default Dictionary;
//
