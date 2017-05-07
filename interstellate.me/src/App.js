import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import './index.css';

import Story from './Story';


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
                        margin: "2rem 4rem"
                    }}>
                    Interstellate_
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
                    <div style={{
                        color: "white", margin: "4rem"
                        }}>Loading...</div>
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
