import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=e5115f67e4dbe8371af89ca9d6247215
        `
      )
      .then((result) => {
        this.setState({ lyrics: result.data.message.body.lyrics });

        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=e5115f67e4dbe8371af89ca9d6247215
          `
        );
      })
      .then((result) => {
        console.log(result);
        this.setState({ tracks: result.data.message.body.track });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;
    return (
      <React.Fragment>
        <Link to="" className="btn btn-dark btn-sm mb-4">
          Go Back !
        </Link>
        <div className="card">
          <h5 className="card-header">
            {" "}
            {track.track_names}
            by <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card.text">{lyrics.lyrics_body}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Lyrics;
