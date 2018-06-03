import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class WaitingRoom extends Component {
    render() {
        return (
            <div className="container vcenter">
                <h2><blue>Waiting...  </blue></h2>
                <h4><blue>be patient :)</blue></h4>
                <h5><white>cards will show up on the board. when any of your cards match any of the displayed cards, click on it!<br/><br/> there may be terms you dont know... so be sure to communicate and work together... as a </white><blue>quizteam</blue></h5>
                </div>
        );
    }
}