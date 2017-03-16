import Clock from './clock.js';
import React, { Component } from 'react';

class ShotClock extends Component {
    onToggleEnabledClick() {
        this.props.onStateChange({shotTimerEnabled:!this.props.shotTimerEnabled});
    }
    onResetClick() {
        this.props.onStateChange({shotTimerCounter:0});
    }
    render() {

        const text = this.props.shotTimerEnabled ? "Disable" : "Enable";

        return (
            <div id="shotClock">
            <button onClick={() => this.onToggleEnabledClick()}>
                {text}
            </button>
            <button onClick={() => this.onResetClick()}>
                Reset
            </button>
            <Clock 
              minutes={this.props.minutes} 
              seconds={this.props.seconds} 
              milliseconds={this.props.milliseconds} /></div>);
    }
}

export default ShotClock;
