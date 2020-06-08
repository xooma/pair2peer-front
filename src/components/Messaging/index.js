/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Columns, Box, Heading, Content } from 'react-bulma-components';
import axios from 'axios';
import { API_URI } from 'src/store/utils';
import { getUserInbox } from 'src/store/actions';
import useInterval from '@use-it/interval';

// == Import
import ChatsList from './chatsList';
import Messages from './messages';
import './style.scss';

const Messaging = () => {
  const dispatch = useDispatch();
  const [selectedChat, setSelectedChat] = useState('');
  const [selectedClass, setSelectedClass] = useState({});

  const handleSelectChat = (evt, chatSerial, index) => {
    setSelectedChat(chatSerial);
    setSelectedClass(index);
  };

  console.log(selectedClass);

  const setItemStyle = (index) => {
    const isItemSelected = selectedClass === index;
    return isItemSelected ? "chatlist-content selected-div" : "chatlist-content";
  };

  const refreshInbox = () => {
    axios.get(
      `${API_URI}/inbox`,
      { withCredentials: true },
    )
      .then((res) => {
        console.log(res);
        dispatch(getUserInbox(res.data));
        sessionStorage.inbox = JSON.stringify(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(refreshInbox, [selectedChat]);
  useInterval(refreshInbox, 6000 * 10);

  return (
    <>
      <Content style={{ textAlign: 'center' }}>
        <Heading size={3}>Messagerie</Heading>
        <Heading subtitle size={6}>Contactez vos pairs facilement</Heading>
      </Content>
      <Columns className="inbox">
        <Columns.Column size={3} className="inbox-chatlist">
          <ChatsList handleSelectChat={handleSelectChat} setItemStyle={setItemStyle} />
        </Columns.Column>
        <Columns.Column className="inbox-messages">
          <Messages refreshInbox={refreshInbox} selectedChat={selectedChat} />
        </Columns.Column>
      </Columns>
      <Columns>
        <Columns.Column />
      </Columns>
    </>
  );
};

export default Messaging;
