import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../Context";
class Search extends Component {
  state = {
    trackTitle: "",
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=e5115f67e4dbe8371af89ca9d6247215
                `
      )
      .then((result) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: result.data.message.body.track_list,
        });

        this.setState({
          trackTitle: "",
        });
      })
      .catch((err) => console.log(err));
  };
  onChange = (e) => {
    this.setState({ trackTitle: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fa fa-music" aria-hidden="true"></i> {"   "}{" "}
                Search For a song
              </h1>
              <p className="lead text-center"> Get Lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    tyep="text"
                    className="form-control form-control-lg"
                    name="TrackTitle"
                    placeholder="Search for title..?"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  ></input>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  {" "}
                  Get Lyrircs
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Search;
