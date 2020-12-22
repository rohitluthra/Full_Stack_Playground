import React, { Component } from "react";

export default class AutocompleteText extends Component {
  constructor(props) {
    super(props);
    this.items = ["United states", "Canada", "India"];
    this.state = {
      suggestions: [], // initial empty
    }; //POJO
  }

  onTextChanged = (e) => {
    const value = e.target.value;

    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i"); // regex matching user added value
      const suggestions = this.items.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({ suggestions }));
  };

  renderSuggestion() {
    const { suggestions } = this.state;

    if (suggestions.length === 0) {
      return null;
    } else {
      return (
        <ul>
          {suggestions.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      );
    }
  }
  render() {
    return (
      <div>
        <input onChange={this.onTextChanged} type="text" />
        {this.renderSuggestion()}
      </div>
    );
  }
}
