import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class JoinRoom extends Component {
    render() {
        return (
            <div className="container vcenter">
                <h2><blue>join room</blue></h2>
                <div>
                    <input class="blue-input" placeholder="room number"/>
                </div>
                <AwesomeButton type="secondary" style={{ marginTop: '32px'}}><buttontext>join room</buttontext></AwesomeButton>
            </div>
        );
    }
}