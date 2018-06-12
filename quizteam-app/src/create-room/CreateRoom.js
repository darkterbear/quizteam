import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { createRoom } from '../api';
import Socket from '../sockets';

export default class CreateRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quizleturl: ''
        }

        Socket.on('roomAdminResponse', function(msg) {
            console.log('roomAdminResponse' + msg)
        })
    }

    createRoom = () => {
        console.log('createroom pressed');
        createRoom(this.state.quizleturl, (response) => {
            console.log('response logged: ' + response);
            if (response.resp_code == 100) {
                this.props.setStep(2, {
                    roomCode: response.room_code,
                    numberOfPlayers: 0,
                    setTitle: response.setTitle,
                    cards: response.cards,
                    adminSecret: response.admin_secret
                });
                Socket.emit('roomAdmin', response.room_code, response.admin_secret)
            }
        });
    }

    handleInput = (e) => {
        this.setState({
            quizleturl: e.target.value
        })
    }
    render() {
        return (
            <div className="container vcenter">
                <h2><green>create room</green></h2>
                <div>
                    <input class="green-input" placeholder="quizlet set url..." onChange={this.handleInput} value={this.state.quizleturl}/>
                </div>
                <AwesomeButton type="secondary" style={{ marginTop: '32px'}} action={this.createRoom}><buttontext>create room</buttontext></AwesomeButton>
            </div>
        );
    }
}