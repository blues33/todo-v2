import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import 'react-dates/lib/css/_datepicker.css';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './sagas/authSagas';

import GlobalStyle from './_helpers/GlobalStyle';

import PrivateRoute from './components/common/PrivateRoute';

import Dashboard from './components/Dashboard';
import Navbar from './components/layout/Navbar';
import About from './components/About';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px);
`;

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <Router>
          <div>
            <Navbar />
            <Container>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
              </Switch>
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Container>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
