import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class Splash extends Component {
    render() {
        return(
            <div className="container vcenter">
                <h1><blue>quiz</blue><green>team</green></h1>
                <AwesomeButton type="secondary" style={{ marginRight: '8px' }} action={() => this.props.setStep(1, {})}><buttontext>create room</buttontext></AwesomeButton>
                <AwesomeButton type="primary" style={{ marginLeft: '8px' }} action={() => this.props.setStep(4, {})}><buttontext>join room</buttontext></AwesomeButton>
            </div>
        );
    }
}