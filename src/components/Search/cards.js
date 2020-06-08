/* eslint-disable react/jsx-filename-extension */
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { firstLetterToUppercase } from 'src/store/utils';
import { Link } from 'react-router-dom';
import { Card, Media, Content, Heading, Form, Tag, Image, Columns, Hero, Container, Button } from 'react-bulma-components';
import { selectedUserDetails } from 'src/store/actions';

// == import components
import Loading from 'src/components/Loading';


const Cards = ({ users, setModalUserDetails }) => {
  const dispatch = useDispatch();
  const { user, usersData } = useSelector((state) => state);

  let key = 1;

  const ItLabels = ({ user }) => {
    if (user.it_language[0].name !== null) {
      return user.it_language.map((label) => (
        <Fragment key={key++}>
          <Form.Control>
            <Tag color="danger">{label.name}</Tag>
          </Form.Control>
        </Fragment>
      ));
    }
    return null;
  };

  const LanguagesLabels = ({ user }) => {
    if (user.language[0] !== null) {
      return user.language.map((language) => (
        <Tag key={key++}>{language}</Tag>
      ));
    }
    return null;
  };

  const handleClickUserDetails = (evt, user) => {
    dispatch(selectedUserDetails(user));
    setModalUserDetails(true);
  };

  if (!users) {
    return <Loading />;
  }

  if (users.length <= 0) {
    return (
      <Columns.Column>
        <Content fluid style={{ textAlign: 'center' }}>
          <Heading size={4}>Aucun résultats</Heading>
        </Content>
      </Columns.Column>
    );
  }

  return users.map((user) => {
    return (
      <>
        <Columns.Column key={key++} size={4}>
          <Card>
            <Card.Content>
              <Media>
                <Media.Item renderAs="figure" position="left">
                  <Image style={{ maxWidth: '100%', height: 'auto' }} size={128} src={user.picture} />
                </Media.Item>
                <Media.Content>
                  <Content>
                    <Heading renderAs="p" size={4}>{user.pseudo}</Heading>
                    <Heading renderAs="p" subtitle size={6}>{firstLetterToUppercase(user.city)}, {firstLetterToUppercase(user.country)}</Heading>
                  </Content>
                </Media.Content>
              </Media>
              <Media>
                <Media.Item>
                  <Tag.Group>
                    <LanguagesLabels user={user} />
                  </Tag.Group>
                </Media.Item>
              </Media>
              <Content>
                {(user.description) ? user.description : null}
              </Content>
              <Media>
                <Media.Item>
                  <Form.Field multiline kind="group">
                    <ItLabels user={user} />
                  </Form.Field>
                </Media.Item>
              </Media>
              <Media>
                <Media.Item>
                  <Button.Group position="right">
                    <Button onClick={(evt) => handleClickUserDetails(evt, user)}>Détails ...</Button>
                  </Button.Group>
                </Media.Item>
              </Media>
            </Card.Content>
          </Card>
        </Columns.Column>
      </>
    );
  });
};

export default Cards;
