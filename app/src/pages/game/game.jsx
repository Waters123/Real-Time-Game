import React, { useState, useEffect } from 'react';
import { Chat } from './chat';
import { WhiteBoard } from './whiteBoard';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  .chat-wrapper {
    width: 35rem;
    position: fixed;
    z-index: 2;
  }
  .game-wrapper {
  }
`;
let index;

export function GamePlay({ socket, name }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('roomData', (roomData) => {
      setPlayers(roomData);
    });
  }, []);

  return (
    <Wrapper>
      <div className="chat-wrapper">
        <Chat socket={socket} />
      </div>
      <div className="game-wrapper">
        <WhiteBoard socket={socket} />
      </div>
    </Wrapper>
  );
}
