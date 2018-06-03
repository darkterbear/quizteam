import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class WaitingRoom extends Component {

    constructor(props) {
        super();
        this.state.waitingText = 'Waiting...';

        this.changeText = this.changeText.bind(this);

        this.changeText();
    }

    changeText() {
        var newText = this.state.waitingText;
        if (newText.contains('...')) newText = 'Waiting.';
        else if (newText.contains('..')) newText = 'Waiting...';
        else newText = 'Waiting..';
        this.setState({waitingText: newText});
        setInterval(this.changeText(), 1000);
    }



    render() {
        return (
            <div className="container vcenter">
                <h2><blue>{this.state.waitingText}</blue></h2>
                <h4><blue>be patient :)</blue><br/><br/></h4>
                <div className="instructions">
                    <h5>cards will show up on the board. when any of your cards match any of the displayed cards, click on it!<br/><br/> there may be terms you dont know... so be sure to communicate and work together... as a <blue>quizteam</blue></h5>
                </div>
                </div>
        );
    }
}