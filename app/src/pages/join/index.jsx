import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { useLazyFetch } from '../../hooks/useLazyFetch';
import { connect } from 'react-redux';

function Join({ state }) {
  const [room, setRoom] = useState('');
  const history = useHistory();
  const [fetcher, data] = useLazyFetch('http://localhost:5000/graphql');

  useEffect(() => {
    if (data.data && data.data.createRoom) {
      history.push(`/game?room=${data.data.createRoom._id}`);
    }
  }, [data.data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqBody = {
      query: `
      mutation{
        createRoom(roomInput:{roomName:"${room}"}){
          roomName,
          _id,
          creator{
            name
          }
        }
     }
     `
    };

    fetcher(reqBody, state.token);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Room name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state.login
  };
};

export default connect(mapStateToProps)(Join);
