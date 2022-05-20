import React, { Component } from "react";

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="showbox">
        <div className="loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="2"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default Loader;
