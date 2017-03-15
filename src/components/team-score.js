import Number from './number.js';
import React, { Component } from 'react';

class TeamScore extends Component {
    render() {
        
        return (
            <div>
                {this.props.name}: <Number value={this.props.value} /> 
                <button onClick={() => this.props.onScoreChangeClick(1)}>UP</button> <button onClick={() => this.props.onScoreChangeClick(-1)}>DOWN</button>
          </div>);
    }
}

export default TeamScore;
