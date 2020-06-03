import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { logOut } from '../store/actions';
import { Pages } from '../pages/index';

const Wrapper = styled.div`
  .user-profile {
    display: flex;
    justify-content: flex-end;
    h5 {
      font-family: 'Lato';
      font-size: 1.5rem;
    }
    button {
      margin: 0 0 0 1rem;
    }
  }
`;

function removeFromLocalStorage() {
  try {
    const serializedState = localStorage.removeItem('state');
  } catch (e) {
    console.log(e);
  }
}

function AuthenticatedApp({ state, logOut }) {
  const handleLogOut = () => {
    logOut({ type: 'logout' });
    removeFromLocalStorage();
  };

  return (
    <Wrapper>
      <div className="user-profile">
        <h5>Wecolme, {state.name} </h5>
        <button onClick={handleLogOut}>logout</button>
      </div>
      <Pages />
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state.login
  };
};

export default connect(mapStateToProps, { logOut })(AuthenticatedApp);
