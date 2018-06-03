import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Card from './Card';
import Socket from '../sockets';

export default class MasterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.cards,
            score: 0
        }

        Socket.on('initialCards', function(cards) {
            this.setState({
                cards: cards
            })
            console.log(cards)
        }.bind(this))

        Socket.on('swapCards', function(oldcard, newcard) {
            let newCards = this.state.cards.slice();
            for (var index in newCards) {
                if (newCards[index].index == oldcard) {
                    newCards[index] = newcard;
                    break;
                }
            }
            this.setState({
                cards: newCards
            })
        }.bind(this));

        Socket.on('updateScore', function(score) {
            this.setState({
                score: score
            });
            console.log(score);
        }.bind(this))
    }

    render() {
        return (
            <div id="root">
                <div className="container" style={{ width: '90%', height: '35%', paddingTop: '32px' }}>
                    <h2><green>{this.state.score}</green></h2>
                </div>

                <div className="container" style={{ width: '90%', height: '35%'}}>
                    <Card text={this.state.cards[0] != null && this.state.cards[0].definition}/>
                    <Card text={this.state.cards[1] != null && this.state.cards[1].definition}/>
                </div>

                <div className="container" style={{ width: '90%', height: '35%', marginTop: '32px' }}>
                    <Card text={this.state.cards[2] != null && this.state.cards[2].definition}/>
                    <Card text={this.state.cards[3] != null && this.state.cards[3].definition}/>
                </div>
            </div>
        );
    }
}