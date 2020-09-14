import React from 'react';
import { PropTypes } from 'prop-types';

import {
    Button,
    FormControl } from 'react-bootstrap';

class ChatRoomUserList extends React.Component {

    componentDidMount() {
        this.setState({currentUser: this.context.user});
        const { socket } = this.context;
        socket.on('updateusers', (roomName, userlist, opsList) => {
            this.setState({users: userlist, ops: opsList, roomName});

            let opslist = (Object.values(opsList));

            for(var i = 0; i < opslist.length; i++) {

                if(this.state.currentUser === opslist[i]) {
                    this.setState({isOp: true});
                    return;
                }
                this.setState({isOp:false});
            }
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            ops: [],
            roomName: props.selectedRoom,
            currentUser : '',
            isOp: false,
            privateReceiver: this.props.selectedUser,
            privateMsg: ''
        };
    };

    kickUser(userToKick) {
        const { socket } = this.context;
        socket.emit('kick', {user: userToKick, room: this.state.roomName}, (kicked) => {
            if(kicked) {
                console.log(userToKick, 'was kicked.');
            }
        });
    }

    banUser(userToBan) {
        const { socket } = this.context;

        socket.emit('ban', {room: this.state.roomName, user: userToBan}, (banned) => {
            console.log(banned);
        })
    };

    sendPrivateMessage() {
        const { socket } = this.context;

        let messagegObj = {
            nick: this.state.privateReceiver,
            message: this.state.privateMsg
        };

        socket.emit('privatemsg', messagegObj, (success) => {
            if(success) {
                console.log('message sent!');
            }
        });
        this.setState({ privateMsg: ''});
        document.getElementById('privateInput').value = '';
    }

    userRouter(key) {
        this.setState({privateReceiver: key});
    }

    render() {
        const { users } = this.state;
        let userList = (Object.values(users));

        let displayUserList = [];
        for(var i = 0; i < userList.length; i++) {
            if(userList[i] != this.state.currentUser) {
                displayUserList.push(userList[i]);
            }
        }

        if(this.state.isOp && this.state.roomName != 'lobby') {
            return (
                <div className='ChatRoomUserList'>
                    <h2 className="listTitle">Users</h2>
                    <h4 className="listTitle">Private message to <strong>{this.state.privateReceiver}</strong></h4>
                    <FormControl type="text" id="privateInput" onInput={(e) => this.setState({privateMsg: e.target.value})} />
                    <Button id="loginBtn" bsStyle="primary" type="button" onClick={() => this.sendPrivateMessage()}>Send</Button>
                    <h3>Online now</h3>
                    <ul>
                        <li>{this.state.currentUser}</li>
                        {displayUserList.map(u => (
                            <li key={u}>
                                <Button key={u} info={u} >{u}</Button>
                                <Button bsStyle="warning" onClick={() => this.kickUser(u)}>Kick</Button>
                                <Button bsStyle="danger" onClick={() => this.banUser(u)}>Ban</Button>
                            </li>))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className='ChatRoomUserList'>
                    <h2 className="listTitle">Users</h2>
                    <h4 className="listTitle">Private message to <strong>{this.state.privateReceiver}</strong></h4>
                    <FormControl type="text" id="privateInput" onInput={(e) => this.setState({privateMsg: e.target.value})} />
                    <Button id="loginBtn" bsStyle="primary" type="button" onClick={() => this.sendPrivateMessage()}>Send</Button>
                    <h3>Online now</h3>
                    <ul>
                        <li>{this.state.currentUser}</li>
                        {displayUserList.map(u => (
                            <li key={u}>
                                <Button key={u} info={u} onClick={() => this.userRouter(u)}>{u}</Button>
                            </li>))}
                    </ul>
                </div>
            );
        }
    };
};

ChatRoomUserList.contextTypes = {
    socket: PropTypes.object.isRequired,
    user: PropTypes.string
};

export default ChatRoomUserList;
