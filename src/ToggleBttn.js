import React, { Component } from "react";
import "./App.css";
import "./ToggleBttn.css";

class ToggleBttn extends Component {
    render(){
    return(
        <button className="toggleBttn"
        onMouseDown={this.props.handleMouseDown}> Leaderboard
        </button>
        )
    }
}

export default ToggleBttn;