// Not sure if this should be capitalized
import React, { Component } from "react";

class Preloader extends Component {
    render() {
        return (
            <div className="preloader">
                <p className="animated infinite bounceIn">Loading...</p>
            </div>
        );
    }
}

export default Preloader;
