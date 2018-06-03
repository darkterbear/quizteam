import React, { Component } from 'react';

export default class Card extends Component {
    render() {
        return (
            <div style={{ width: '40%', height: '100%', background: '#ffffff', float: 'left', marginLeft: '5%', marginRight: '5%'}}>
                <p style={{ fontFamily: 'Montserrat', fontWeight: 'bold', color: '#000000', top: '35%', position: 'relative', marginRight: '16px', marginLeft: '16px'}}>{this.props.text}</p>
            </div>
        );
    }
}