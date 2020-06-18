import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Message } from './message';

const Wrapper = styled.div`
  border-right: 1px solid grey;

  .chat-infobar {
    border-bottom: 1px solid grey;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  }
`;

const ChatWrapper = styled.div`
  height: 90vh;
`;

function Messages({ messages, state: { name } }) {
  return (
    <Wrapper>
      <div className="chat-infobar">players</div>
      <ScrollToBottom>
        <ChatWrapper>
          {messages.map((message, i) => (
            <div key={i}>
              <Message message={message} name={name} />
            </div>
          ))}
        </ChatWrapper>
      </ScrollToBottom>
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state.login
  };
};

export default connect(mapStateToProps)(Messages);
