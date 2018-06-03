import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class CreateRoom extends Component {
    render() {
        return (
            <div className="container vcenter">
                <h2><green>create room</green></h2>
                <div>
                    <input class="green-input" placeholder="quizlet set url..."/>
                </div>
                <AwesomeButton type="secondary" style={{ marginTop: '32px'}}><buttontext>create room</buttontext></AwesomeButton>
            </div>
        );
    }
}