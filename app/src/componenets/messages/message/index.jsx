import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  margin: 0 1rem 0 1rem;
  align-items: baseline;

  .user-name {
    color: ${(props) => props.color};
    line-height: 1;
  }
  .user-msg {
    font-size: 1.3rem;
    line-height: 1;
  }
  .msg-box {
    width: 80%;
    word-wrap: break-word;
  }
`;
export function Message({ message: { user, text }, name }) {
  return (
    <Wrapper color={user === 'admin' ? 'red' : user === name ? 'orange' : 'inherit'}>
      <div>
        <p className="user-name">{user}:&nbsp;</p>
      </div>
      <div className="msg-box">
        <p className="user-msg">{text}</p>
      </div>
    </Wrapper>
  );
}
