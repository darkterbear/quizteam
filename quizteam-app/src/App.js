import React from 'react';
import Splash from './splash/Splash';
import CreateRoom from './create-room/CreateRoom';
import JoinRoom from './join-room/JoinRoom';
import WaitingRoom from './waiting-room/WaitingRoom';
import MasterStandby from './master-standby/MasterStandby';
import MasterScreen from './master-screen/MasterScreen';
import PlayerScreen from './player-screen/PlayerScreen';

export default class App extends React.Component {

    constructor(props) {
        super();

        this.state ={
            step: 0
        };

        /*
            0: splash
            1: create room
            2: master standby
            3: master screen

            4: join room
            5: waiting room
            6: player screen
        */
    }

    setStep(stepNum, updateStateObject) {
        this.setState(updateStateObject, () => {
            this.setState({step: stepNum});
        });
    }

    render() {
        var renderComponent;

        switch(this.state.step) {
            case 0:
                renderComponent = <Splash/>;
                break;
            case 1:
                renderComponent = <CreateRoom/>;
                break;
            case 2:
                renderComponent = <MasterStandby roomCode={this.state.roomCode} numberOfPlayers={this.state.numberOfPlayers} setTitle={this.state.setTitle} />;
                break;
            case 3:
                renderComponent = <CreateRoom />;
                break;
            case 4:

                break;
            case 5:

                break;
            case 6:

                break;
        }

        return (
            {a}
            //<CreateRoom/>
            //<JoinRoom/>
            //<WaitingRoom/>
            //<MasterStandby roomCode='249722' numberOfPlayers='32' setTitle='apush presidents' />
            <MasterScreen score={1000} cards={['meme 1', 'meme 2', 'meme 3', 'meme 4']}/>
        )
    }
}