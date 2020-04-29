import React from 'react';
import { connect } from 'react-redux';

import { logOut } from '../store/actions';

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.removeItem('state');
  } catch (e) {
    console.log(e);
  }
}

function authenticatedApp({ state, logOut }) {
  const handleLogOut = () => {
    logOut({ type: 'logout' });
    loadFromLocalStorage();
  };

  return (
    <>
      <h1>Welcome {state.data.name}</h1>
      <button onClick={handleLogOut}>logout</button>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state.login
  };
};

export default connect(mapStateToProps, { logOut })(authenticatedApp);
