// == Import npm
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { submitLogin, actions } from 'src/store/actions';
import useInputChange from 'src/store/hooks/useInputChange';
import { Button, Form, Box, Columns, Heading, Content, Container, Notification } from 'react-bulma-components';

// == Import

// == Composant
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors, loading, signupConfirm } = useSelector((state) => state);
  const [input, handleInputChange] = useInputChange();

  console.log(input)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(submitLogin(history, input));
    dispatch({ type: actions.SET_LOADER });
  };

  const ErrorsMessage = () => {
    return (
      <Notification color="danger">
        {Object.keys(errors).map((objectKey, index) => (
          <p>{errors[objectKey]}</p>
        ))}
      </Notification>
    );
  };

  const SignupConfirm = () => {
    return (
      <Notification color="success">
        <p>Inscription prise en compte</p>
        <p>Veuillez vous connecter</p>
      </Notification>
    );
  };

  return (
    <>
      <Columns gapless>
        <Columns.Column />
        <Columns.Column>
          <Columns>
            <Container>
              <Content style={{ textAlign: 'center' }}>
                <Heading size={3}>Connectez-vous</Heading>
                <Heading subtitle size={6}>Et commencez à travailler</Heading>
              </Content>
            </Container>
          </Columns>
          <Columns.Column />
          <Box>
            {(signupConfirm) ? <SignupConfirm /> : null}
            {(errors) ? <ErrorsMessage /> : null}
            <form onSubmit={handleSubmit}>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Email</Form.Label>
                  <Form.Input required name="email" onChange={handleInputChange} value={input.email} />
                </Form.Control>
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Input required name="password" type="password" onChange={handleInputChange} value={input.password} />
                </Form.Control>
              </Form.Field>
              <Columns.Column />
              <Button loading={loading} fullwidth color="success">Connexion</Button>
            </form>
            <Columns.Column />
            <Columns.Column />
            <Columns>
              <Container>
                <Content style={{ textAlign: 'center' }}>
                  <Heading subtitle size={6}><Link to="/signup">Pas encore inscrit ?</Link></Heading>
                </Content>
              </Container>
            </Columns>
          </Box>
        </Columns.Column>
        <Columns.Column />
      </Columns>
    </>
  );
};

// == Export
export default Login;
