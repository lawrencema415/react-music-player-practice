import React, {Component} from 'react';
import './MusicPlayer.css';
class MusicPlayer extends Component {
  state = {
    song:"https://spotify-clone.s3-us-west-1.amazonaws.com/Ozuna+-+Aura/14.+Unica.mp3"
  }

  play() {
    this.refs.player.play();

    setTimeout( () => {
      this.setState({song:"https://spotify-clone.s3-us-west-1.amazonaws.com/Illenium+-+Ashes/07-Without+You+(feat.+SKYLR).mp3"})
    }, 1000);
  }

  render() {
    return (
      <div className="player">
        <div className="audio-controls">
          <a href="#"><i className="fa fa-chevron-left" aria-hidden="true"></i></a>
          <a onClick={this.play.bind(this)}><i className="fa fa-play" aria-hidden="true"></i></a>
          <a href="#"><i className="fa fa-chevron-right" aria-hidden="true"></i></a>
        </div>
        <div className="progress">
          <div className="bar">
          <div></div>
          </div>
        </div>

        <audio ref="player">
          <source src={this.state.song}/>
        </audio>

      </div>
    );
  }
};

export default MusicPlayer;
