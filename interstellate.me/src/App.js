import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import './index.css';

import Story from './Story';

class Loading extends Component {
    render() {
        // <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
        return (
            <div style={{
                    width: "2em",
                    margin: "auto",
                    marginTop: "10vh"
                }}>
                <svg width="360" height="360" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                    <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
                        <circle cx="22" cy="22" r="6" stroke-opacity="0">
                            <animate attributeName="r"
                                begin="1.5s" dur="3s"
                                values="6;22"
                                calcMode="linear"
                                repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity"
                                begin="1.5s" dur="3s"
                                values="1;0" calcMode="linear"
                                repeatCount="indefinite" />
                            <animate attributeName="stroke-width"
                                begin="1.5s" dur="3s"
                                values="2;0" calcMode="linear"
                                repeatCount="indefinite" />
                        </circle>
                        <circle cx="22" cy="22" r="6" stroke-opacity="0">
                            <animate attributeName="r"
                                begin="3s" dur="3s"
                                values="6;22"
                                calcMode="linear"
                                repeatCount="indefinite" />
                            <animate attributeName="stroke-opacity"
                                begin="3s" dur="3s"
                                values="1;0" calcMode="linear"
                                repeatCount="indefinite" />
                            <animate attributeName="stroke-width"
                                begin="3s" dur="3s"
                                values="2;0" calcMode="linear"
                                repeatCount="indefinite" />
                        </circle>
                        <circle cx="22" cy="22" r="8">
                            <animate attributeName="r"
                                begin="0s" dur="1.5s"
                                values="6;1;2;3;4;5;6"
                                calcMode="linear"
                                repeatCount="indefinite" />
                        </circle>
                    </g>
                </svg>
            </div>
        )
    }
}


class Home extends Component {

    constructor(opts) {
        super(opts);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch("https://80flrm6v81.execute-api.us-east-1.amazonaws.com/prod/all_tweets_interstellate").then(res => {
            return res.json();
        }).then(json => {
            this.setState({ data: json.data.sort((i, j) => {
                return i[2] < j[2]
            }) })
        });
    }

    render() {
        return (
            <div>
                <h1 style={{
                        color: "white",
                        margin: "2rem 4rem",
                        fontFamily: "'Roboto Mono', monospace",
                        letterSpacing: "0.1em"
                    }}>
                    INTERSTELLATE_
                    <p style={{
                        marginLeft: "9rem",
                        marginTop: "-0.3rem",
                        fontSize: "0.8rem",
                        color: "#dedede",
                        letterSpacing: "1"
                    }}>curated by <a href="https://twitter.com/caitvw" style={{
                        color: "rgb(200, 230, 255)",
                        textDecoration: "none"
                    }}>@caitvw</a></p>
                </h1>
                { this.state.data.length ? (
                    <GridList
                        cellHeight={(window.innerHeight / 2) - 10}
                        >
                        {this.state.data.map((tile) => (
                            <GridTile
                                style={{ cursor: "pointer" }}
                                onTouchTap={ _ => { window.location = `https://twitter.com/interstellate_/status/${tile[0]}` }}
                                key={tile[0]}
                                title={""}
                                subtitle={tile[3]}
                                subtitleStyle={{ overflow: "wrap", textOverflow: "wrap" }}
                                titleStyle={{ overflow: "wrap", textOverflow: "wrap" }}
                                >
                                <img src={tile[1]} />
                                <div style={{
                                    background: "rgba(10, 10, 10, 0.8)",
                                    position: "absolute",
                                    bottom: 0,
                                    width: "100%",
                                    }}>
                                    <p style={{
                                        color: "white",
                                        fontSize: "0.8em",
                                        margin: "1.5em"
                                    }}>
                                        {tile[3]}
                                    </p>
                                </div>
                            </GridTile>
                        ))}
                    </GridList>
                ) : (
				    <div>
					    <Loading />
				    </div>
                ) }
            </div>
        )
    }
}
class About extends Component {
    render() {
        return (
            <div>
                About
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <Router>
                        <div>
                            <Route exact path="/" component={Home}/>
                            <Route path="/about" component={About}/>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
