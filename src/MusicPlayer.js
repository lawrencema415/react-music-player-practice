import React, {Component} from 'react';
import './MusicPlayer.css';
import './App.css';
class MusicPlayer extends Component {
  constructor() {
    super();
    this.state = {
      songUrl:"https://spotify-clone.s3-us-west-1.amazonaws.com/Ozuna+-+Aura/14.+Unica.mp3",
      isPlaying:false,
      progress:0,
      dragProgressBar:false,
      loop:false
    }
    this.progressInChange =  false;
    this.interval = setInterval(this.update,1000);
  }

  update = () => {
    let player = this.refs.player;
    if(this.refs.player) {
      if(!this.progressInChange) {
        this.setState({
          progress: player.currentTime / player.duration
        });
      }
    }
    if(player.ended) {
      console.log("done");
    }
  }

  togglePlay = () => {
    this.state.isPlaying ? this.setState({isPlaying:false}) : this.setState({isPlaying:true});

  }

  // setTimeout( () => {
  //   this.setState({songUrl:"https://spotify-clone.s3-us-west-1.amazonaws.com/Illenium+-+Ashes/07-Without+You+(feat.+SKYLR).mp3"})
  // }, 1000);

  progressBarActivate = e => {
    this.setState({dragProgressBar:true});
    this.setTime(e);
  }

  stopDrag = e => {
    this.setState({dragProgressBar:false});
  }

  setTime = (e) => {
    if(this.state.dragProgressBar) {
      let progress = ((e.clientX - offsetLeftConvert(this.refs.progress_bar)) / this.refs.progress_bar.clientWidth);
      console.log(progress);
      this.setState({progress:progress});
      this.progressInChange = true
    }
  }

  render() {
    let currentTime = 0;
    let totalTime = 0;
    if(this.refs.player) {
      let player = this.refs.player;
      player.loop = this.state.loop;
      if(player.currentSrc !== this.state.songUrl) {
        player.src = this.state.songUrl;
      }
      if(player.paused && !player.ended) {
        if(this.state.isPlaying) {
          player.play();
        }
      } else if (!this.state.isPlaying) {
        player.pause();
      }
      if(this.progressInChange) {
        this.progressInChange = false;
        player.currentTime = player.duration * this.state.progress;
      }

      currentTime = player.currentTime;
      totalTime = player.duration;

    }

    let playerClassName = {
      "fa": true,
      "fa-play": !this.isPlaying,
      "fa-pause": this.state.isPlaying
    };
    return (
      <div className="player">
        <div className="audio-controls">
          <a href="#"><i className="fa fa-chevron-left" aria-hidden="true"></i></a>
          <a onClick={this.togglePlay}><i className={classnames(playerClassName)} aria-hidden="true"></i></a>
          <a href="#"><i className="fa fa-chevron-right" aria-hidden="true"></i></a>
        </div>
        <div className="progress" onMouseDown={this.progressBarActivate} onMouseMove={this.setTime} onMouseLeave={() => this.setState({dragProgressBar:false})} onMouseUp={this.stopDrag}>
          <div ref="progress_bar" className="bar">
          <div style={{width: (this.state.progress * 100) + "%" }}></div>
          </div>
        </div>
        <div className="timeStamp"> {convertTime(currentTime)} / {convertTime(totalTime)} </div>
        <audio ref="player" autoplay={this.state.isPlaying}>
          <source src={this.state.songUrl}/>
        </audio>

      </div>
    );
  }
};

function convertTime(time) {
  let minutes = Math.floor(time % 3600 / 60);
  let seconds = Math.floor(time % 3600 % 60);

  return minutes + ":" + seconds;
}

function offsetLeftConvert(el) {
  let left = 0;
  while(el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

function classnames(obj) {
  let css = [];
  Object.keys(obj).forEach( key => {
    if(obj[key]) {
      css.push(key)
    }
  })
  return css.join(' ');
}

export default MusicPlayer;
