import React, { Component } from 'react';

export default class Card extends Component {
    render() {
        return (
            <div style={{ width: '40%', height: '100%', background: '#ffffff', float: 'left', marginLeft: '5%', marginRight: '5%'}}>
                <h5 style={{ color: '#000000', top: '35%', position: 'relative'}}>{this.props.text}</h5>
            </div>
        );
    }
}