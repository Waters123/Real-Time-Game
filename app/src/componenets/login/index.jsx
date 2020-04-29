import React, { useState } from 'react';
import styled from 'styled-components';

import Signin from './signin';
import { SignUp } from './signup';
import amumu from '../../assets/images/amumu.png';
import maokai from '../../assets/images/maokai.png';
import fizz from '../../assets/images/fizz.png';

const LoginWrapper = styled.div`
  .login-box {
    margin: 15rem 0 0 2rem;
    display: flex;
    width: 85rem;
    height: 65rem;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);

    background-color: red;
    .login-left {
      flex: 45%;
      background-color: #16222a;
      height: 100%;

      div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      h2 {
        font-size: 5rem;
        color: #fff;
      }
      img {
        margin: 2rem;
        display: block;
        width: 15rem;
      }
    }
    .login-right {
      flex: 55%;
      background-color: #fff;
    }
    .login-content {
    }
    .login-title {
      padding: 10rem 0 0 0;
      text-align: center;
      font-family: 'lato';
      .login-text {
        font-size: 3rem;
      }
    }
  }
`;

export function Login() {
  const [isRegistered, setIsRegiterd] = useState(true);

  return (
    <LoginWrapper>
      <div className="login-box">
        <div className="login-left">
          <div>
            <h2>Draw League</h2>
            <img src={amumu} alt="amumu logo" />
            <img src={maokai} alt="maokai logo" />
            <img src={fizz} alt="fizz logo" />
          </div>
        </div>
        <div className="login-right">
          <div className="login-content">
            {isRegistered ? (
              <Signin setIsRegiterd={setIsRegiterd} />
            ) : (
              <SignUp setIsRegiterd={setIsRegiterd} />
            )}
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
}
