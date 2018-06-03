import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class MasterStandby extends Component {
    render() {
        return (
            <div id="root">
                <div className="container">
                    <h2><green>{this.props.roomCode}</green></h2>
                </div>

                <div className="container vcenter">
                    <AwesomeButton type="secondary" style={{ marginTop: '32px' }}><buttontext>start game</buttontext></AwesomeButton>
                </div>
            </div>
        );
    }
}