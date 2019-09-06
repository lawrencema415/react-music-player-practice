import React, {Component} from 'react';
import './App.css';
import MusicPlayer from './MusicPlayer';
class App extends Component {


  render() {
    return (
      <div className="App">
      <div className="title">Mini music player</div>
      <MusicPlayer />
      </div>
    );
  }
};

export default App;
