import React, { Component } from 'react';
import Clock from './Clock.js';
import Timer from './Timer.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 1,
      seconds: 0
    };
    this.gameTimer = new Timer(this.state.minutes, this.state.seconds);
    this.gameTimer.on('tick', 
      () => this.onGameTimerTick()
    );
    this.gameTimer.start();

  }
  onGameTimerTick() {
      this.setState({
        minutes: this.gameTimer.minutes,
        seconds: this.gameTimer.seconds
      });
  }

  render() {
    return (
      <div className="App">
        <Clock minutes={this.state.minutes} seconds={this.state.seconds} />
      </div>
    );
  }
}

export default App;
