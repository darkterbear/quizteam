import React, { Component } from 'react';
import Sockets from '../sockets';

import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class JoinRoom extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            roomCode: ''
        }

        Sockets.socket.on('setRoomResponse', function(msg) {
            console.log(msg);
        })
    }

    joinRoom = () => {
        Sockets.emit('setRoom', this.state.roomCode)
    }

    handleChange = (e) => {
        this.setState({
            roomCode: e.target.value
        })
    }

    render() {
        return (
            <div className="container vcenter">
                <h2><blue>join room</blue></h2>
                <div>
                    <input class="blue-input" placeholder="room number" onChange={this.handleChange} value={this.state.roomCode}/>
                </div>
                <AwesomeButton type="primary" style={{ marginTop: '32px'}} action={this.joinRoom}><buttontext>join room</buttontext></AwesomeButton>
            </div>
        );
    }
}