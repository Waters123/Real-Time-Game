import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Messages from '../../componenets/messages';

const Wrapper = styled.div`
  .msg-input {
    padding: 0.5rem;
    width: 100%;
  }
  .input-wrapper {
    padding: 1.5rem;
    border: 1px solid grey;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  }
`;

export function Chat({ socket }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', (roomData) => {
      setPlayers(roomData);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <Wrapper>
      <Messages messages={messages} />
      <div className="input-wrapper">
        <input
          className="msg-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        />
      </div>
    </Wrapper>
  );
}
