import React, { Component } from 'react';

class Clock extends Component {
  render() {
    return (
      <div className="clock">
        <span>{this.props.minutes}</span>:<span>{this.props.seconds}</span>
      </div>
    );
  }
}

export default Clock;
