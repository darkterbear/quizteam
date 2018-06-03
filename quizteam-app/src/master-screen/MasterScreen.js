import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Card from './Card';
import Socket, { emit } from '../sockets';

export default class MasterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <div id="root">
                <div className="container" style={{ paddingTop: '32px' }}>
                    <h2><green>{this.props.score}</green></h2>
                </div>

                <div className="container" style={{ width: '90%', height: '35%'}}>
                    <Card text={this.props.cards[0]}/>
                    <Card text={this.props.cards[1]}/>
                </div>

                <div className="container" style={{ width: '90%', height: '35%', marginTop: '32px' }}>
                    <Card text={this.props.cards[2]}/>
                    <Card text={this.props.cards[3]}/>
                </div>
            </div>
        );
    }
}