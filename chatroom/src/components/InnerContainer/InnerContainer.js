import React from 'react';
import ChatRoomList from '../ChatRoomList/ChatRoomList';
import ChatRoomUserList from '../ChatRoomUserList/ChatRoomUserList';
import ChatRoom from '../ChatRoom/ChatRoom';

import { PropTypes } from 'prop-types';

class InnerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.roomForwarder = this.roomForwarder.bind(this);
        this.state = {
            currentRoom: 'lobby',
            rooms: []
        };
    };

    componentDidMount() {
        const { socket } = this.context;
        socket.emit('rooms');
        socket.on('roomlist', (roomList) => {
            this.setState({rooms: roomList});
        });

        socket.on('kicked', (roomKickedFrom, kickedUser, whoKicked) => {
            if(this.context.user == kickedUser) {
                console.log(kickedUser, 'kicked by', whoKicked);
                this.roomForwarder('lobby', kickedUser);
            }
        });

        socket.on('banned', (roomBannedFrom, bannedUser, whoBanned) => {
            if(this.context.user == bannedUser) {
                console.log(bannedUser, 'banned by', whoBanned);
                this.roomForwarder('lobby', bannedUser);
            }
        });
    }

    roomForwarder(key, user) {
        const { socket } = this.context;

        if(this.state.rooms[key]) {
            for(var i = 0; i < (this.state.rooms[key].banned).length; i++) {
                if(user == (this.state.rooms[key].banned)[i]) {
                    console.log('USER BANNED IN ROOM:', key);
                    return;
                }
            }
        }

        socket.emit('joinroom', {room: key, user: user}, (joined, reason) => {
            if(joined) {
                this.setState({currentRoom: key});
            } else {
                console.log(reason);
            }
        });
    }

    render() {
        return (
            <div className='InnerContainer'>
                <ChatRoomList fwdr={this.roomForwarder} />
                <ChatRoomUserList />
                <ChatRoom selectedRoom={this.state.currentRoom} />
            </div>
        );
    };
};

InnerContainer.contextTypes = {
    socket: PropTypes.object.isRequired,
    user: PropTypes.string
};

InnerContainer.propTypes = {
    currentRoom: PropTypes.string,
    rooms: PropTypes.array
};

export default InnerContainer;
