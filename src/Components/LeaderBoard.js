import React, { Component } from "react";

class LeaderBoard extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className="leaderboard">
				<h2 className="leaderboardHeader">leaderboard:</h2>

				<ul className="leaderboardList">
				{this.props.leaderBInfo.map((fbInfo, index) =>{
								return (
							<li 
							key={index.key}
							className="leaderboardItem">
								<p className="leaderboardName"><span className='leaderboardSpan'>name:</span> {fbInfo.name}</p>
										<p className="leaderboardScore"><span className='leaderboardSpan'>score:</span> {fbInfo.score}/10</p>
										<p className="leaderboardTime"><span className='leaderboardSpan'>time:</span> {fbInfo.time} secs</p>
								})}
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}

export default LeaderBoard;
