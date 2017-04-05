import React, { Component } from 'react';
import Number from './number';
import { Panel } from 'react-bootstrap';

class Clock extends Component {
    intToDigitElements(timeInt) {

    }
    render() {
        var clockElements;
        if (this.props.minutes === 0 && this.props.seconds < 10) {

            const milliseconds = this.props.milliseconds / 100;

            clockElements = (
                <Panel>
                    <Number value={this.props.seconds} showLeadingZero="true" />
                    .
                    <Number value={milliseconds} />
                </Panel>);
        } else {
            clockElements = (
                <Panel>
                    <Number value={this.props.minutes} />
                    :
                    <Number value={this.props.seconds} showLeadingZero="true" />
                </Panel>);
        }

        return (
            <div>
                {clockElements}
            </div>);
    }
}

export default Clock;
