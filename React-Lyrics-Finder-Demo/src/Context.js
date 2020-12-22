import React, { Component } from "react";
import axios from "axios";
/* Context  */
const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results",
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 tracks",
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  componentDidMount() {
    axios
      .get(
        `
        https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=e5115f67e4dbe8371af89ca9d6247215
        `
      )
      .then((result) => {
        this.setState({ track_list: result.data.message.body.track_list });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {/* Whatever state se put in this component, will be accessible to other compnent. As long as w use component.. */}
        {this.props.children}
      </Context.Provider>
    );
  }
}
/* This will be imported to other components so we could access this state.*/
export const Consumer = Context.Consumer;
