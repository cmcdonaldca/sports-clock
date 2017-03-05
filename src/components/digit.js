import React, { Component } from 'react';
class Digit extends Component {
    render() {
        const className = "digit-" + (this.props.size || "large");
        return (
            <span className={className}>
              {this.props.value}
            </span>
        );
    }
}
export default Digit;
