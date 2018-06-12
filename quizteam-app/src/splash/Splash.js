import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Sound from 'react-sound';

export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isClick: Sound.status.STOPPED
        };
    }

    render() {
        return(
            <div className="container vcenter">
                <Sound
                  url="http://quizteam.dsys32.com:3000/static/click.ogg"
                  playStatus={this.state.isClick}
                  playFromPosition={0 /* in milliseconds */}
                  onFinishedPlaying={() => {this.setState({isClick: Sound.status.STOPPED})}}
                />
                <h1><blue>quiz</blue><green>team</green></h1>
                <AwesomeButton type="secondary" style={{ marginRight: '8px' }} action={() => {this.props.setStep(1, {}); this.setState({isClick: Sound.status.PLAYING})}}><buttontext>create room</buttontext></AwesomeButton>
                <AwesomeButton type="primary" style={{ marginLeft: '8px' }} action={() => {this.props.setStep(4, {}); this.setState({isClick: Sound.status.PLAYING})}}><buttontext>join room</buttontext></AwesomeButton>
            </div>
        );
    }
}