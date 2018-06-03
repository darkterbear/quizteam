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
                <h3><blue>your cards</blue></h3>
                <AwesomeButton type="anchor" style={{height: '70%', width: "40%", 'margin-right': "5%", background: '#FFFFFF'}}><buttontext>test</buttontext></AwesomeButton>
                <AwesomeButton type="anchor" style={{height: '70%', width: "40%"}}><buttontext>test</buttontext></AwesomeButton>
            </div>
        )
    }
}