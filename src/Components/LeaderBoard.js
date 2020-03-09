import React, { Component } from "react";
import "./LeaderBoard.css";


class LeaderBoard extends Component {
	constructor() {
		super();
	}
	render() {
		let visibility = 'hide';

		if (this.props.leaderBVisibility){
			visibility = 'show';
		}

		return (
			<div  
				onMouseDown={this.props.handleMouseDown} className={`${visibility} leaderBoard`}>
			<h2 className="leaderboardHeader">leaderboard:</h2>
			<ul className="leaderboardList">
			{this.props.leaderBInfo.map((fbInfo, index) =>{
							return (
								<li 
								key={index.key}
								className="leaderboardItems">
									<p className="leaderboardItem"><span className='leaderboardSpan'>name:</span> {fbInfo.name}</p>
										<p className="leaderboardItem"><span className='leaderboardSpan'>score:</span> {fbInfo.score}/10</p>
										<p className="leaderboardItem"><span className='leaderboardSpan'>time:</span> {fbInfo.time} secs</p>
								</li>
					)
				})}

			</ul>
		</div>
		)
	}
}

export default LeaderBoard;
