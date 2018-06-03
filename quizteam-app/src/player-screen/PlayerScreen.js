import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Socket from '../sockets'

export default class PlayerScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.cards
        }

        Socket.on('addCard', function(card) {
            this.setState({
                cards: this.state.cards.concat(card)
            })
        }.bind(this))

        Socket.on('swapCards', function(oldcard, newcard) {
            if (this.state.cards[0].index == oldcard) {
                this.setState({
                    cards: [newcard, this.state.cards[1]]
                })
            } else {
                this.setState({
                    cards: [this.state.cards[0], newcard]
                })
            }
        }.bind(this));
    }
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