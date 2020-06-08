// == Import npm
import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
import { getFiltersList, getAuthentified, getUserInbox, actions } from 'src/store/actions';
import { API_URI } from 'src/store/utils';
import { Container, Hero } from 'react-bulma-components';
import axios from 'axios';


// == Import
import Login from 'src/components/Login';
import Profile from 'src/components/Profile';
import Signup from 'src/components/Signup';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Search from 'src/components/Search';
import Home from 'src/components/Home';
import NotFound from 'src/components/Page404';
import Messaging from 'src/components/Messaging';
import UserMap from 'src/components/Map';
import About from 'src/components/About';
import UserProfile from 'src/components/Search/ModalDetails';
import Loading from 'src/components/Loading';
import Contact from 'src/components/Contact';
import EmailConfirm from 'src/components/EmailConfirm';

// == Import css
import './styles.css';

// Ajout d'une route /signup

// == Composant
const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, selectedUser } = useSelector((state) => state);

  // const sessionUser = () => {
  //   if (!user) {
  //     const userInfo = JSON.parse(sessionStorage.getItem('user'));
  //     const inboxUserInfo = JSON.parse(sessionStorage.getItem('inbox'));
  //     if (userInfo) {
  //       dispatch(getAuthentified(userInfo));
  //       dispatch(getUserInbox(inboxUserInfo));
  //     }
  //   }
  // };

  const loginCheck = useCallback((component) => {
    if (!user) {
      return <Redirect to="/login" />;
    }
    return component;
  }, [user]);

  // useEffect(sessionUser, [user]);

  // Req to get filters list
  const getFilters = () => {
    axios.get(
      `${API_URI}/`,
      { withCredentials: true },
    )
      .then((res) => {
        const data = res.data;
        const filtersList = {};
        let usersData = {};
        console.log(res.data);
        filtersList.it_language = data.it_language;
        filtersList.language = data.language;
        filtersList.localisation = data.localisation;
        usersData = data.maxUser;
        dispatch(getFiltersList(filtersList, usersData));
        dispatch({ type: actions.CLEAR_ERRORS_MSG });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const switchClasses = () => {
    switch (location.pathname) {
      case '/': {
        return 'container-home';
      }
      case '/login': {
        return 'container-login';
      }
      case '/signup': {
        return 'container-signup';
      }
      case '/contact': {
        return 'container-contact';
      }
      case '/about': {
        return 'container-about';
      }
      case '/profile': {
        return 'container-profile';
      }
      case '/search': {
        return 'container-search';
      }
      case '/map': {
        return 'container-map';
      }
      case '/inbox': {
        return 'container-inbox';
      }
      default: {
        return null;
      }
    }
  };

  useEffect(getFilters, [user]);

  return (
    <div className="app">
      <Hero className={switchClasses()} color="light" size="fullheight">
        <Hero.Head>
          <Header />
        </Hero.Head>

        <Hero.Body color="primary">
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" render={() => { if (user) { return <Redirect to="/" />; } return <Login />; }} />
              <Route exact path="/signup" render={() => { if (user) { return <Redirect to="/" />; } return <Signup />; }} />
              <Route exact path="/map" component={UserMap} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/profile" render={() => loginCheck(<Profile />)} />
              <Route exact path="/profile/:pseudo" render={() => loginCheck(<UserProfile />)} />
              <Route exact path="/search" render={() => loginCheck(<Search />)} />
              <Route exact path="/inbox" render={() => loginCheck(<Messaging />)} />
              <Route exact path="/about" render={About} />
              <Route exact path="/logout" render={Loading} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/activation/user/:pseudo" component={EmailConfirm} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Hero.Body>
        <Hero.Footer>
          <Footer />
        </Hero.Footer>
      </Hero>
    </div>
  );
};

// == Export
export default App;
