import React, { Component } from 'react';
import Digit from './digit';
class Number extends Component {
    render() {
        let digits = (this.props.value + "").split("");
        if (digits.length === 1 && this.props.showLeadingZero) {
            digits = [0, digits[0]];
        }
        let digitElements = digits.map((digit, index) => <Digit key={index} value={digit} />);
        const className = "number-" + (this.props.size || "large");
        return (
            <span className={className}>
              {digitElements}
            </span>
        );
    }
}
export default Number;
