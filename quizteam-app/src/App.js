import React from 'react';
import Splash from './splash/Splash';
import CreateRoom from './create-room/CreateRoom';
import JoinRoom from './join-room/JoinRoom';

export default class App extends React.Component {

    render() {
        return (
            //<Splash/>
            <JoinRoom/>
        )
    }
}