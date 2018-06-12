import React from 'react';
import Splash from './splash/Splash';
import CreateRoom from './create-room/CreateRoom';
import JoinRoom from './join-room/JoinRoom';
import WaitingRoom from './waiting-room/WaitingRoom';
import MasterStandby from './master-standby/MasterStandby';
import MasterScreen from './master-screen/MasterScreen';
import PlayerScreen from './player-screen/PlayerScreen';
import Sockets from './sockets';

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

        this.setStep = this.setStep.bind(this);
      Sockets.on('roomDestroyed', () => {
        this.setStep(0, {
          roomCode: null,
          numberOfPlayers: null,
          setTitle: null,
          cards: null,
          adminSecret: null
        });
      });
    }

    setStep(stepNum, updateStateObject) {
        this.setState(updateStateObject, () => {
            this.setState({step: stepNum});
        });
    }

    getRoomCode = () => {
        return this.state.roomCode
    }

    render() {
        var renderComponent;

        switch(this.state.step) {
            case 0:
                renderComponent = <Splash setStep={this.setStep}/>;
                break;
            case 1:
                renderComponent = <CreateRoom setStep={this.setStep}/>;
                break;
            case 2:
                renderComponent = <MasterStandby adminSecret={this.state.adminSecret} roomCode={this.state.roomCode} numberOfPlayers={this.state.numberOfPlayers} setTitle={this.state.setTitle} setStep={this.setStep} />;
                break;
            case 3:
                renderComponent = <MasterScreen cards={[]} />;
                break;
            case 4:
                renderComponent = <JoinRoom setStep={this.setStep} />
                break;
            case 5:
                renderComponent = <WaitingRoom setStep={this.setStep} />
                break;
            case 6:
                renderComponent = <PlayerScreen cards={[]} getRoomCode={this.getRoomCode}/>
                break;
        }

        return (
            /*
                <Sound
                  url="http://quizteam.dsys32.com:3000/static/1.mp3"
                  playStatus={Sound.status.PLAYING}
                  playFromPosition={300}
                  onPlaying={this.handleSongPlaying}
                />
            */
            
            <div>
                {renderComponent}
            </div>
        );
    }
}