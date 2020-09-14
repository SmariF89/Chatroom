import React from 'react';
import {shallow} from 'enzyme';
import {SocketIO, Server} from 'mock-socket';
import ChatRoom from './ChatRoom';

jest.useFakeTimers();

describe('ChatRoom tests', () => {

  let mockSocketServer;
  let mockSocket;

  beforeEach(() => {
    mockSocketServer = new Server('http://localhost:3000');

    mockSocketServer.on('connection', socket => {
        socket.on('updatechat', (message) => {

          socket.emit('sendmsg', message);
        });
    });

    mockSocket = SocketIO.connect('http://localhost:3000');

    jest.runOnlyPendingTimers();

  });

  afterEach(() => {
    mockSocketServer.stop();
    mockSocket.close();
  });
  it('should emit the right message', () => {
    const message = 'message';
    const dummy = {roomName: 'lobby', user:'snorri'}
    const component = shallow(<ChatRoom selectedRoom='lobby'/>, {context: {socket: mockSocket}});

    component.find('#inputBox').first().simulate('input', {target: {value: message} });

    component.find('#inputBtn').first().simulate('click');


      setTimeout(function () {
        expect(component.state().messages.length).toBe(1);
        expect(component.state().messages[0].toEqual(`${messageList[0].nick} (${messageList[0].timestamp}) - ${message}\n`))
      }, 250);

  })



  });
