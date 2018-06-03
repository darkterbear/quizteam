import React, { Component } from 'react';

export default class Card extends Component {
    render() {
        return (
            <div style={{ width: '40%', height: '100%', background: '#ffffff', float: 'left', marginLeft: '5%', marginRight: '5%'}}>
                <h3 style={{ color: '#000000', marginTop: '20%'}}>{this.props.text}</h3>
            </div>
        );
    }
}