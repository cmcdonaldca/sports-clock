import Number from './number.js';
import React, { Component } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

class TeamScore extends Component {
    render() {
        
        return (
            <Panel header={this.props.name}>
                <Grid>
                    <Row>
                        <Col>
                        <Number value={this.props.value} /> 
                        </Col>
                        <Col>
                            <button onClick={() => this.props.onScoreChangeClick(1)}>UP</button> <button onClick={() => this.props.onScoreChangeClick(-1)}>DOWN</button>
                        </Col>
                    </Row>
                </Grid>
          </Panel>);
    }
}

export default TeamScore;
