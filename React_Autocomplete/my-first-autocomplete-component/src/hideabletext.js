import React, { Component } from "react";

export default class hideabletext extends Component {
  constructor(props) {
    super(props); // parent class constructor
  }

  render() {
    return (
      <div>
        <button className="btn btn-default">Toggle</button>
        {this.props.text}
      </div>
    );
  }
}
