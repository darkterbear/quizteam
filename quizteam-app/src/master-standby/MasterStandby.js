import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Socket from '../sockets';
import { startGame } from '../api';
import Sound from 'react-sound';

export default class MasterStandby extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfPlayers: this.props.numberOfPlayers
        }

        Socket.on('updateNumberOfPlayers', function(players) {
            console.log('update player count signal received: ' + players + ' players');
            this.setState({
                numberOfPlayers: players
            });
        }.bind(this));

        Socket.on('startGame', function () {
            this.props.setStep(3, {});
        }.bind(this));

        this.startGameClick = this.startGameClick.bind(this);
    }
  
    handleSongPlaying = (position, duration) => {
      console.log('SONG IS PLAYING');
    }

    startGameClick() {
        if (this.state.numberOfPlayers < 3) {
            return false;
        }

        startGame(this.props.roomCode, this.props.adminSecret, (response) => {
            if (response.resp_code == 100) {
                this.props.setStep(3, {});
            }
        });
    }

    render() {
        return (
            <div id="root">
                <Sound
                  url="http://www.hochmuth.com/mp3/Haydn_Adagio.mp3"
                  playStatus={Sound.status.PLAYING}
                  playFromPosition={300 /* in milliseconds */}
                  onPlaying={this.handleSongPlaying}
                />

                <div className="container" style={{paddingTop: '32px'}}>
                    <h2><green>{this.props.roomCode}</green></h2>
                </div>

                <div className="container vcenter">
                    <subtext>{this.props.setTitle}</subtext><br/>
                    <bigtext>{this.state.numberOfPlayers}</bigtext><br/>
                    <subtext>player(s)</subtext><br/>
                </div>

                <div className="container" style={{bottom: '4vh', position: 'absolute'}}>
                    <AwesomeButton type="secondary" action={this.startGameClick}><buttontext>start game</buttontext></AwesomeButton>
                </div>
            </div>
        );
    }
}