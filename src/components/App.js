import React, { Component } from 'react';
import Clock from './clock.js';
import Timer from './timer.js';
import TimerToggle from './timer-toggle.js';
import '../styles/app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameTimer : {
        minutes: 0,
        seconds: 12,
        milliseconds: 0,
        isRunning: false
      },
      penalities: [{
        player: {
          number: 12,
          name: "colin"
        },
        start: {

        }, 
        lengthMilliseconds : 1000 * 60 * 2 // 2 min
      }],
      scores: {
        home: 0,
        away: 0
      },
      period: 1,
      shotTimer : {
        minutes: 0,
        seconds: 30,
        milliseconds: 0,
        isRunning: false
      }
    };

    this.gameTimer = new Timer(this.state.gameTimer);
    this.gameTimer.on('tick', 
      (state) => this.onGameTimerTick(state)
    );
    this.gameTimer.on('end', 
      (state) => this.onGameTimerEnd(state)
    );
    this.gameTimer.start();

  }
  onGameTimerTick(state) {
      this.setState({
        gameTimer: state
      });
  }
  onGameTimerEnd(state) {
    alert("BUZZER");
  }

  onTimeControlerClick() {
    const state = this.gameTimer.toggleRunningState();;
    this.setState({
      gameTimer: state
    });
  }

  render() {
    return (
      <div className="App">
        <Clock minutes={this.state.gameTimer.minutes} seconds={this.state.gameTimer.seconds} milliseconds={this.state.gameTimer.milliseconds} />
        <TimerToggle timerIsOn={this.state.gameTimer.isRunning}  onClick={() => this.onTimeControlerClick()} />
      </div>
    );
  }


}

export default App;
