import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { createRoom } from '../api';

export default class CreateRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quizleturl: ''
        }
    }

    createRoom = () => {
        createRoom(this.state.quizleturl);
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