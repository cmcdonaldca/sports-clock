import React, { Component } from 'react';
import Number from './number';

class Clock extends Component {
    intToDigitElements(timeInt) {

    }
    render() {
        var digitElements;
        if (this.props.minutes === 0 && this.props.seconds < 10) {
            digitElements = (
                <div>
                    <Number value={this.props.seconds} showLeadingZero="true" />
                    .
                    <Number value={this.props.milliseconds} />
                </div>);
        } else {
            digitElements = (
                <div>
                    <Number value={this.props.minutes} />
                    :
                    <Number value={this.props.seconds} showLeadingZero="true" />
                </div>);
        }

        return (
            <div className="clock">
                {digitElements}
            </div>);
    }
}

export default Clock;
