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
                <div className="container" style={{paddingTop: '32px'}}>
                    <h2><green>{this.props.roomCode}</green></h2>
                </div>

                <div className="container vcenter">
                    <bigtext>{this.props.numberOfPlayers}</bigtext><br/>
                    <subtext>player(s)</subtext><br/><br/>
                    <AwesomeButton type="secondary" style={{ marginTop: '32px' }}><buttontext>start game</buttontext></AwesomeButton>
                </div>
            </div>
        );
    }
}