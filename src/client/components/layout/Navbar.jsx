import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../../sagas/authSagas';
import colors from '../../_helpers/colors';

const Nav = styled.nav`
  background-color: ${colors.green};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  font-family: 'Roboto', sans-serif;
`;

const Logo = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  box-sizing: border-box;
  &:hover {
    color: #000;
  }
`;

const NavButton = styled(Link)`
  color: #fff;
  text-transform: capitalize;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  margin-right: 1rem;
  &:hover {
    color: #000;
  }
`;

const LogoutLink = styled.button`
  color: #fff;
  background-color: transparent;
  border: 0;
  font-family: 'Roboto', sans-serif;
  text-transform: capitalize;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    color: #ccc;
  }
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const logout = <LogoutLink onClick={this.onLogoutClick.bind(this)}>Выйти</LogoutLink>;
    return (
      <Nav>
        <Logo to="/">Todo</Logo>
        <div>
          <NavButton to="/about">о нас</NavButton>
          {isAuthenticated ? logout : ''}
        </div>
      </Nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
