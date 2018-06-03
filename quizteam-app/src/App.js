import React from 'react';
import Splash from './splash/Splash';
import CreateRoom from './create-room/CreateRoom';
import JoinRoom from './join-room/JoinRoom';
import WaitingRoom from './waiting-room/WaitingRoom';

export default class App extends React.Component {

    render() {
        return (
            //<Splash/>
            <WaitingRoom/>
        )
    }
}