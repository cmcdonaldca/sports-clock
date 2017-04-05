import React, { Component } from 'react';
import Clock from './clock.js';
import ShotClock from './shot-clock.js';
import Timer from './timer.js';
import TimerToggle from './timer-toggle.js';
import TeamScore from './team-score.js';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameTimerLength : 3*60 * 1000, // 2 minutes
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
      shotTimerCounter: 0,
      shotTimerLength : 30 * 1000, // 30 seconds
      shotTimerEnabled: true,
      buzzer: false
    };

    this.tickOffset = 100; // 100 milliseconds

    this.gameTimer = new Timer(this.tickOffset);
    this.gameTimer.setLength(this.state.gameTimerLength);
    this.gameTimer.on('tick', 
      (state) => this.onGameTimerTick(state)
    );
    this.gameTimer.on('stopped', 
      (state) => this.onGameTimerEnd(state)
    );
    this.gameTimer.on('started', 
      (state) => this.onGameTimerStart(state)
    );
  }

  componentWillMount() {
    this.updateClocks();
  }
  onGameTimerTick() {
    this.setState((prevState, props) => {
      return {
        gameTimerCounter: prevState.gameTimerCounter + this.tickOffset,
        shotTimerCounter: (prevState.shotTimerCounter + (prevState.shotTimerEnabled ? this.tickOffset : 0))
      }
    }, this.updateClocks);
  }

  updateClocks() {

    const gameTimerClock = this._getClockData(this.state.gameTimerLength - this.state.gameTimerCounter);
    const shotTimerClock = this._getClockData(this.state.shotTimerLength - this.state.shotTimerCounter);

    this.setState({
      gameTimerClock,
      shotTimerClock
     }, this.checkForBuzzer);
  }

  checkForBuzzer() {
    const gameTimerTimeLeft = this.state.gameTimerLength - this.state.gameTimerCounter;
    const shotTimerTimeLeft = this.state.shotTimerLength - this.state.shotTimerCounter;
    if (this.gameTimer.isRunning() && (gameTimerTimeLeft === 0 || shotTimerTimeLeft === 0)) {

      this.gameTimer.stop();

      const newState = {
        buzzer: true
      };

      // reset the shot clock
      if (shotTimerTimeLeft === 0) {
        newState["shotTimerCounter"] = 0;
      }

      this.setState(newState);

      // Turn the buzzer off after X seconds
      setTimeout(
        () => this._onBuzzerEnd(),
        3000);
    }    
  }

  _onBuzzerEnd() {
    this.setState({
      buzzer: false
    });
  }

  _getClockData(gameTime) {
    if (gameTime < 0) {
      return {
        minutes: 0, seconds: 0, milliseconds: 0
      };
    }
    const minutes = Math.floor(gameTime / 60 / 1000);
    const seconds = Math.floor((gameTime - minutes * 60 * 1000) / 1000);
    const milliseconds = gameTime - (minutes * 60 * 1000) - (seconds * 1000);
    return {
      minutes, seconds, milliseconds
    };
  }

  onGameTimerEnd(state) {
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

  onShotClockStateChange(state) {
    this.setState(state, this.updateClocks);
  }

  render() {
    return (
      <div>
      <PageHeader>Scoreboard <small>Hockey</small></PageHeader>
      <Grid>
        <Row className="show-grid">
          <Col md={6}>
            <TeamScore value={this.state.home} name="Home" onScoreChangeClick={(incrementBy) => this.onScoreChangeClick("home", incrementBy)} />
          </Col>
          <Col md={6}>
            <TeamScore value={this.state.away} name="Away" onScoreChangeClick={(incrementBy) => this.onScoreChangeClick("away", incrementBy)} />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={6} mdOffset={3}>
            <Clock minutes={this.state.gameTimerClock.minutes} seconds={this.state.gameTimerClock.seconds} milliseconds={this.state.gameTimerClock.milliseconds} />
            <TimerToggle timerIsOn={this.state.gameTimerRunningStatus}  onClick={() => this.onTimeControlerClick()} />
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={6} mdOffset={3}>

            <ShotClock 
              shotTimerEnabled={this.state.shotTimerEnabled}
              onStateChange={(state) => this.onShotClockStateChange(state)}
              minutes={this.state.shotTimerClock.minutes} 
              seconds={this.state.shotTimerClock.seconds} 
              milliseconds={this.state.shotTimerClock.milliseconds} />
          </Col>
        </Row>
      </Grid>
      </div>
    );
  }


}

export default App;
