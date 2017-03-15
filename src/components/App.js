import React, { Component } from 'react';
import Clock from './clock.js';
import Timer from './timer.js';
import TimerToggle from './timer-toggle.js';
import TeamScore from './team-score.js';
import '../styles/app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameTimer : {
        minutes: 1,
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
      home: 10,
      away: 20,
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

  onScoreChangeClick(team, incrementBy) {
    // do not allow scores to go below 0
    this.setState((prevState, props) => ({
      [team]: incrementBy < 0 && prevState[team] === 0 ? prevState[team] : prevState[team] + incrementBy
    }));
  }

  render() {
    return (
      <div className="App">
        <Clock minutes={this.state.gameTimer.minutes} seconds={this.state.gameTimer.seconds} milliseconds={this.state.gameTimer.milliseconds} />
        <TimerToggle timerIsOn={this.state.gameTimer.isRunning}  onClick={() => this.onTimeControlerClick()} />
        <TeamScore value={this.state.home} name="Home" onScoreChangeClick={(incrementBy) => this.onScoreChangeClick("home", incrementBy)} />
        <TeamScore value={this.state.away} name="Away" onScoreChangeClick={(incrementBy) => this.onScoreChangeClick("away", incrementBy)} />
      </div>
    );
  }


}

export default App;
