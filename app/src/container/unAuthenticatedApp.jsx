import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Login } from '../componenets/login';
import draven from '../assets/images/draven.png';

const Wrapper = styled.div`
  background: linear-gradient(to right, #16222a, #3a6073);
  height: 100vh;
  display: flex;
  .content-signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100rem;

    .title {
    }

    h1 {
      font-size: 15rem;
      color: #fff;
    }
  }
`;

function unAuthenticatedApp({ auth, onLogin }) {
  return (
    <Wrapper>
      <div className="content-signup">
        <div className="title">
          <h1>Draw League</h1>
        </div>
        <img src={draven} alt="draven logo" />
      </div>
      <Login />
    </Wrapper>
  );
}

export default unAuthenticatedApp;
