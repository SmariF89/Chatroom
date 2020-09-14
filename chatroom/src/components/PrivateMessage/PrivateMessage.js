import React from 'react';
import { PropTypes } from 'prop-types';
import { Alert } from 'react-bootstrap';
import $ from 'jquery';

class PrivateMessage extends React.Component {
    componentDidMount() {
        const { socket } = this.context;
        socket.on('recv_privatemsg', (theUser, theMessage) => {
            this.setState({privateMsg: theMessage, privateReceiver: theUser});
            document.getElementById('privMsgId').classList.remove('privMsg');
            $('#privMsgId').show().delay(10000).fadeOut();
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            privateMsg: '',
            privateReceiver: ''
        };
    }

    render() {
        return (
            <div className='PrivateMessage'>
                <Alert bsStyle='success' id='privMsgId' className='privMsg'>
                    <strong>{this.state.privateReceiver}: </strong>{this.state.privateMsg}
                </Alert>
            </div>
        );
    };
};

PrivateMessage.contextTypes = {
    socket: PropTypes.object.isRequired,
};

PrivateMessage.propTypes = {
    privateMsg: PropTypes.string,
    privateReceiver: PropTypes.string
}

export default PrivateMessage;
