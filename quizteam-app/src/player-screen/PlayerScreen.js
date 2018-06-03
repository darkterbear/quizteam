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
                <AwesomeButton type='primary' style={{ height: '70%', width: "40%", 'margin-right': "5%" }}>
                    <h5 style={{ color: '#ffffff', top: '35%', position: 'relative' }}>{this.props.cards[0]}</h5>
                </AwesomeButton>
                <AwesomeButton type='primary' style={{ height: '70%', width: "40%" }}>
                    <h5 style={{ color: '#ffffff', top: '35%', position: 'relative' }}>{this.props.cards[1]}</h5>
                </AwesomeButton>
            </div>
        )
    }
}