import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class TimerToggle extends Component {
    render() {
        var text = this.props.timerIsOn ? "Stop" : "Start";
        
        return (
            <Button bsStyle="primary" bsSize="large" onClick={() => this.props.onClick()}>
                {text}
            </Button>);
    }
}

export default TimerToggle;
