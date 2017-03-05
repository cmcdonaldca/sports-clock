import React, { Component } from 'react';
import Clock from './clock.js';
import Timer from './timer.js';
import '../styles/app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 10,
      milliseconds: 0
    };
    this.gameTimer = new Timer(this.state.minutes, this.state.seconds, this.state.milliseconds);
    this.gameTimer.on('tick', 
      () => this.onGameTimerTick()
    );
    this.gameTimer.start();

  }
  onGameTimerTick() {
      this.setState({
        minutes: this.gameTimer.minutes,
        seconds: this.gameTimer.seconds,
        milliseconds: this.gameTimer.milliseconds
      });
  }

  render() {
    return (
      <div className="App">
        <Clock minutes={this.state.minutes} seconds={this.state.seconds} milliseconds={this.state.milliseconds} />
      </div>
    );
  }
}

export default App;
