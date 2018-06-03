import React, { Component } from 'react';
import {
    AwesomeButton,
    AwesomeButtonProgress,
    AwesomeButtonShare,
} from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

export default class MasterStandby extends Component {
    render() {
        return (
            <div className="container vcenter">
                <AwesomeButton type="secondary" style={{ marginTop: '32px' }}><buttontext>start game</buttontext></AwesomeButton>
            </div>
        );
    }
}