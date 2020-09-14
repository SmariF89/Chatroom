import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import socketClient from 'socket.io-client';

import '../styles/site';
import {
    Jumbotron,
    Button,
    FormControl,
    Alert } from 'react-bootstrap';
import $ from 'jquery';


// Import components
import Container from './components/Container/Container';

class App extends React.Component {
    getChildContext() {
        return {
            socket: this.state.socket,
            user: this.state.userName
        };
    }

    // A call to socketClient is only made once. All uses of socket refer to this one.
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            loggedIn: false,
            socket: socketClient('http://localhost:7099')
        };
    }

    setUser() {
        const { socket, user } = this.getChildContext();
        socket.emit('adduser', user, (isAvailable) => {
            if(!user) {
                document.getElementById('loginMsgIfEmpty').classList.remove('loginError');
                document.getElementById('loginMsgIfEmpty').classList.add('loginErrorRender');
                $('#loginMsgIfEmpty').show().delay(800).fadeOut();
                return;
            }
            if(user.indexOf(' ') !== -1) {
                document.getElementById('loginMsgContainsWhiteSpace').classList.remove('loginError');
                document.getElementById('loginMsgContainsWhiteSpace').classList.add('loginErrorRender');
                $('#loginMsgContainsWhiteSpace').show().delay(800).fadeOut();
                return;
            }
            if(!isAvailable) {
                document.getElementById('loginMsg').classList.remove('loginError');
                document.getElementById('loginMsg').classList.add('loginErrorRender');
                $('#loginMsg').show().delay(800).fadeOut();
            }else {
                this.setState({loggedIn: true});
                socket.emit('joinroom', {room: 'lobby', user: user}, (joined, reason) => {
                    if(joined) {
                        console.log(user, 'successfully joined lobby')
                    } else {
                        console.log(reason);
                    }
                });
            }
        });
    }

    render() {
        if(!this.state.loggedIn) {
            return(
                <Jumbotron className='app'>
                	<label>Provide a user name to proceed...</label>
                	<FormControl type="text" id="userLogin" onInput={(e) => this.setState({userName: e.target.value})} />
                	<Button id="loginBtn" bsStyle="primary" type="button" onClick={() => this.setUser()}>Login</Button>
                	<Alert bsStyle='danger' id='loginMsg' className='loginError'>This username is <strong>taken!</strong> Please pick another one.</Alert>
                	<Alert bsStyle='danger' id='loginMsgIfEmpty' className='loginError'>Username cannot be <strong>empty!</strong></Alert>
                	<Alert bsStyle='danger' id='loginMsgContainsWhiteSpace' className='loginError'>Username cannot contain <strong>white space!</strong></Alert>
                </Jumbotron>
            );
        } else {
            return(
                <Container />
            );
        }
    };
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired,
    user: PropTypes.string
};

App.propTypes = {
    userName: PropTypes.string,
    loggedIn: PropTypes.bool
};

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
