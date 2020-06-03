import React from 'react';
import { connect } from 'react-redux';

import { StyledGlobal } from './componenets/GlobalStyles';

import UnAuthenticatedApp from './container/unAuthenticatedApp';
import AuthenticatedApp from './container/authenticatedApp';
import { login } from './store/actions';

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
  }
}

function App({ state, login }) {
  const storage = loadFromLocalStorage();

  if (storage && !state.token) {
    login(storage);
  }

  return (
    <>
      <StyledGlobal />
      {state.token ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    state: { ...state.login }
  };
};

export default connect(mapStateToProps, { login })(App);
