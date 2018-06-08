import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Socket from '../sockets';

export default class WaitingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dots: 1
        }
        this.waitDots = this.waitDots.bind(this);

        Socket.on('startGame', function () {
            this.props.setStep(6, {});
        }.bind(this));
    }

    componentDidMount() {
        this.waitUpdates = setInterval(
            () => this.updateWaitTick(),
            1000
          );
    }
  
    componentWillUnmount() {
        clearInterval(this.waitUpdates);
    }

    updateWaitTick() {
        this.setState(function(prevState) {
            var dot = prevState.dots + 1;
            if (dot == 4) dot = 1;

            return {
                dots: dot
            }
        })
    }
  
    back = () => {
      Socket.emit('leaveRoom');
      console.log('leaveRoom emitted');
      this.props.setStep(0, {
        roomCode: null,
        numberOfPlayers: null,
        setTitle: null,
        cards: null,
        adminSecret: null
      });
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
        console.log(this.state.dots)
        return (
            <div>
              <AwesomeButton type="primary" style={{ marginTop: '32px', marginLeft: '32px' }} action={this.back}><buttontext>leave room</buttontext></AwesomeButton>
              <div className="container vcenter" style={{width: '60%', margin: '0 auto', position: 'relative'}}>
                <h2><blue><span style={{color: '#202020'}}>{this.waitDots()}</span>Waiting{this.waitDots()}</blue></h2>
                <h4><blue>be patient :)</blue></h4>
                <h5>cards will show up on the board. when any of your cards match any of the displayed cards, click on it!<br/><br/> there may be terms you dont know... so be sure to communicate and work together... as a <blue>quizteam</blue></h5>
              </div>
            </div>
        );
    }
}