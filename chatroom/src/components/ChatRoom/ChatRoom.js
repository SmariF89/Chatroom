import React from 'react';
import { PropTypes } from 'prop-types';

class ChatRoom extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        socket.on('updatechat', (id, messageList) => {
            let messages = [];
            if(id === this.props.selectedRoom) {
                for(var i = 0; i < messageList.length; i++) {
                    messages.push(`${messageList[i].nick} (${messageList[i].timestamp}) - ${messageList[i].message}\n`);
                }
                this.setState({ messages, roomName: this.props.selectedRoom });
            }
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messages: [],
            roomName: props.selectedRoom,
            user : '',
        };
    };
    sendMessage() {
        const { socket } = this.context;

        let messageObj = {
            msg: this.state.msg,
            roomName: this.state.roomName,
            user: this.context.user
        };

        socket.emit('sendmsg', messageObj);
        this.setState({ msg: ''});
    };

    render() {
        const { messages, msg, roomName } = this.state;
        return (
            <div className='Chat-room'>
                <h2 id="roomTitle">{roomName}</h2>
                <textarea rows={messages.length} value={messages} disabled>
                </textarea>
                <div className="input-box">
                    <input
                        id="inputBox"
                        type="text"
                        value={msg}
                        className="input input-big"
                        onInput= {(e) => this.setState({msg: e.target.value})} />
                    <button
                        id="inputBtn"
                        type="button"
                        className="btn pull-right"
                        onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
};

ChatRoom.contextTypes = {
    socket: PropTypes.object.isRequired,
    user: PropTypes.string
};

ChatRoom.propTypes = {
    msg: PropTypes.string,
    messages: PropTypes.array,
    roomName: PropTypes.string,
    user : PropTypes.string
}

export default ChatRoom;
