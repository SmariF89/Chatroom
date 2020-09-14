import React from 'react';
import { PropTypes } from 'prop-types';
import $ from 'jquery';

import {
    Button,
    FormControl } from 'react-bootstrap';

class ChatRoomList extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        socket.emit('rooms');
        socket.on('roomlist', (roomList) => {
            this.setState({rooms: roomList});
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            gotErrorMessage: false
        };
    };

    addRoom(roomName) {
        const { socket, user } = this.context;
        let roomList = (Object.keys(this.state.rooms));

        if(roomList.includes(roomName)) {
            document.getElementById('roomNameMsgIfTaken').classList.remove('loginError');
            document.getElementById('roomNameMsgIfTaken').classList.add('roomErrorRender');
            $('#roomNameMsgIfTaken').show().delay(800).fadeOut();
            return;
        }
        if(!roomName) {
            document.getElementById('roomNameMsgIfEmpty').classList.remove('loginError');
            document.getElementById('roomNameMsgIfEmpty').classList.add('roomErrorRender');
            $('#roomNameMsgIfEmpty').show().delay(800).fadeOut();
            return;
        }
        if(roomName.indexOf(' ') !== -1) {
            document.getElementById('roomNameMsgContainsWhiteSpace').classList.remove('loginError');
            document.getElementById('roomNameMsgContainsWhiteSpace').classList.add('roomErrorRender');
            $('#roomNameMsgContainsWhiteSpace').show().delay(800).fadeOut();
            return;
        }
        socket.emit('joinroom', {room: roomName, user: user}, (joined, reason) => {
            if(joined) {
                console.log(user, 'successfully joined', roomName);
                socket.emit('rooms');
                socket.on('roomlist', (roomList) => {
                    this.setState({rooms: roomList});
                });
            } else {
                console.log(reason);
            }
        });
        this.roomRouter(roomName);
        document.getElementById('newRoomInp').value = '';
    }

    roomRouter(key) {
        // Making sure that 'this' in the parent is refering
        // to its 'this', not this 'this'.
        this.props.fwdr.call(this, key, this.context.user);
    }

    render() {
        const { rooms } = this.state;
        let roomList = (Object.keys(rooms));
        return (
            <div className='ChatRoomList'>
                <h2 className='listTitle'>Chatrooms</h2>
                <span className='listTitle'>
                    <FormControl id="newRoomInp" type="text" />
                    <Button bsStyle="primary" id="roomButton" onClick ={ () => this.addRoom(document.getElementById('newRoomInp').value)}>Add</Button>
                    <p id='roomNameMsgIfTaken' className='loginError listTitle'>Name taken!</p>
                    <p id='roomNameMsgIfEmpty' className='loginError listTitle'>Name empty!</p>
                    <p id='roomNameMsgContainsWhiteSpace' className='loginError listTitle'>White space!</p>
                </span>
                <select id="roomListSelectable" multiple>
                    {roomList.map(m => (
                        <option key={m} info={m} onClick={() => this.roomRouter(m)}>{m}</option>
                    ))}
                </select>
            </div>
        );
    };
};

ChatRoomList.contextTypes = {
    socket: PropTypes.object.isRequired,
    user: PropTypes.string
};

export default ChatRoomList;
