import React from 'react';
import Splash from './splash/Splash';
import CreateRoom from './create-room/CreateRoom';
import JoinRoom from './join-room/JoinRoom';
import WaitingRoom from './waiting-room/WaitingRoom';
import MasterStandby from './master-standby/MasterStandby';
import MasterScreen from './master-screen/MasterScreen';

export default class App extends React.Component {

    render() {
        return (
            //<Splash/>
            //<CreateRoom/>
            //<JoinRoom/>
            //<WaitingRoom/>
            //<MasterStandby roomCode='249722' numberOfPlayers='32' setTitle='apush presidents' />
            <MasterScreen score={1000} cards={['meme 1', 'meme 2', 'meme 3', 'meme 4']}/>
        )
    }
}