import React, { useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { GamePlay } from './game';

let socket;

function Game({ state, location }) {
  const ENDPOINT = 'http://localhost:7000/';
  socket = io(ENDPOINT);

  useEffect(() => {
    const { room } = queryString.parse(location.search);

    socket.emit('join', { name: state.name, room });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return <GamePlay socket={socket} name={state.name} />;
}

const mapStateToProps = (state) => {
  return {
    state: state.login
  };
};

export default connect(mapStateToProps)(Game);
