import React, { Component } from 'react';

class TimerToggle extends Component {
    render() {
        var text = this.props.timerIsOn ? "Stop" : "Start";
        
        return (
            <button onClick={() => this.props.onClick()}>
                {text}
            </button>);
    }
}

export default TimerToggle;
