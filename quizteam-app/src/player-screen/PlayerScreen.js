import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class PlayerScreen extends Component {
    render() {
        return(
            <div className="container vcenter" style={{height: '80%', width: '80%', margin: '0 auto', position: 'relative'}}>
                <h3><blue>your cards</blue></h3><br/>
                <AwesomeButton type='primary' style={{ height: '70%', width: "40%", 'margin-right': "5%" }}><buttontext>{this.props.cards[0]}</buttontext></AwesomeButton>
                <AwesomeButton type='primary' style={{ height: '70%', width: "40%" }}><buttontext>{this.props.cards[1]}</buttontext></AwesomeButton>
            </div>
        )
    }
}