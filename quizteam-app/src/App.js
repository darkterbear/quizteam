import React from 'react';
import Splash from './splash/Splash';
import CreateRoom from './create-room/CreateRoom';
import JoinRoom from './join-room/JoinRoom';
import WaitingRoom from './waiting-room/WaitingRoom';
import MasterStandby from './master-standby/MasterStandby';
import PlayerScreen from './player-screen/PlayerScreen';

export default class App extends React.Component {

    render() {
        return (
            //<Splash/>
            //<CreateRoom/>
            //<JoinRoom/>
            <WaitingRoom/>
            //<MasterStandby roomCode='249722' numberOfPlayers='32' setTitle='apush presidents' />
        )
    }
}