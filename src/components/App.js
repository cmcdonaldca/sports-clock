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
      gameTimerLength : 10 * 1000, // 2 minutes
      gameTimerCounter : 0,
      gameTimerRunningStatus : false,
      gameTimerClock : {
        minutes: 0,
        seconds: 0,
        milliseconds: 0
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
      shotTimerClock : {
        minutes: 0,
        seconds: 30,
        milliseconds: 0
      },
      shotTimerLength : 30 * 1000 // 30 seconds
    };

    this.gameTimer = new Timer();
    this.gameTimer.setLength(this.state.gameTimerLength);
    this.gameTimer.on('tick', 
      (state) => this.onGameTimerTick(state)
    );
    this.gameTimer.on('end', 
      (state) => this.onGameTimerEnd(state)
    );
    this.gameTimer.on('start', 
      (state) => this.onGameTimerStart(state)
    );
  }

  componentWillMount() {
    this.updateClocks();
  }
  onGameTimerTick(state) {
    // if (this.state.shotTimer.isInUse) {
    //   if (this.state.shotTimer.minutes === 0 
    //     && this.state.shotTimer.seconds === 0
    //     && this.state.shotTimer.milliseconds === 0) {
    //     this.setState({
    //       shotTimer : {
    //         minutes : this.state.shotTimerSettings.setMinutes,
    //         seconds: this.state.shotTimerSettings.setSeconds,
    //         milliseconds: 0,
    //         isInUse: false
    //       }
    //     });
    //     alert("BUZZER");
    //   } else {
    //     this.setState((prevState, props) => ({
    //       shotTimer : {
    //         minutes : this.state.shotTimerSettings.setMinutes,
    //         seconds: this.state.shotTimerSettings.setSeconds,
    //         milliseconds: 0,
    //         isInUse: false
    //       }
    //     }));
        
    //   }
    // }

    this.setState({
      gameTimerCounter: state
    }, this.updateClocks);
  }

  updateClocks() {
    const gameTime = this.state.gameTimerLength - this.state.gameTimerCounter;
    const minutes = Math.floor(gameTime / 60 / 1000);
    const seconds = Math.floor((gameTime - minutes * 60 * 1000) / 1000);
    const milliseconds = gameTime - (minutes * 60 * 1000) - (seconds * 1000);

    this.setState({
      gameTimerClock: {
        minutes,
        seconds,
        milliseconds
    }});
  }

  onGameTimerEnd(state) {
    alert("BUZZER");
    this.setState({
      gameTimerRunningStatus: false
    });    
  }

  onGameTimerStart(state) {
    this.setState({
      gameTimerRunningStatus: true
    });
  }

  onTimeControlerClick() {
    const state = this.gameTimer.toggleRunningState();
    this.setState({
      gameTimerRunningStatus: state
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
        <Clock minutes={this.state.gameTimerClock.minutes} seconds={this.state.gameTimerClock.seconds} milliseconds={this.state.gameTimerClock.milliseconds} />
        <TimerToggle timerIsOn={this.state.gameTimerRunningStatus}  onClick={() => this.onTimeControlerClick()} />
        <TeamScore value={this.state.home} name="Home" onScoreChangeClick={(incrementBy) => this.onScoreChangeClick("home", incrementBy)} />
        <TeamScore value={this.state.away} name="Away" onScoreChangeClick={(incrementBy) => this.onScoreChangeClick("away", incrementBy)} />

        <Clock minutes={this.state.shotTimerClock.minutes} seconds={this.state.shotTimerClock.seconds} milliseconds={this.state.shotTimerClock.milliseconds} />

      </div>
    );
  }


}

export default App;
