import React, { Component } from 'react';

export default class Story extends Component {

    render() {
        return (
            <div style={{
                    background: "#222"
                }}>
                <p
                    style={{
                        fontFamily: "Roboto",
                        fontSize: "2.5em",
                        color: "white"
                    }}>
                    { this.props.title }
                </p>
                <p>{ this.props.subtitle }</p>
                <p>{ this.props.byline }</p>
                <p>{ this.props.bylineAffiliation }</p>
            </div>
        )
    }
}
