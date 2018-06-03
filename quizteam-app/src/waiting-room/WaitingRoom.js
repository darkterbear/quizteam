import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class WaitingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dots: 1
        }
        this.waitDots = this.waitDots.bind(this);
    }

    componentDidMount() {
        this.waitUpdates = setInterval(() => this.updateWaitTick, 0.3);
    }
  
    componentWillUnmount() {
        clearInterval(this.waitUpdates);
    }

    updateWaitTick() {
        this.setState((prevState, props) => {
            dots = prevState.dots + 1;
            if (dots == 4) dots = 1;
            return {
                dots: dots
            }
        })
    }

    waitDots() {
        switch(this.state.dots) {
            case 1:
                return '.';
            case 2:
                return '..';
            case 3:
                return '...';
        }
    }

    render() {
        return (
            <div className="container vcenter">
                <h2><blue>Waiting{}  </blue></h2>
                <h4><blue>be patient :)</blue></h4>
                <h5>cards will show up on the board. when any of your cards match any of the displayed cards, click on it!<br/><br/> there may be terms you dont know... so be sure to communicate and work together... as a <blue>quizteam</blue></h5>
                </div>
        );
    }
}