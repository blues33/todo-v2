import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../../sagas/authSagas';
import colors from '../../_helpers/colors';
import { media } from '../../_helpers/mediaQuerriesBreakpoints';

const Nav = styled.nav`
  background-color: ${colors.green};
  padding: 1rem;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  font-family: 'Bitter', serif;
  margin-bottom: 3rem;
`;

const Links = styled.div`
  padding: 0;
  display: none;
  flex-direction: column;
  flex-basis: 100%;
  text-align: center;
  background-color: ${colors.black};
  margin-top: 1rem;
  ${media.tablet`
    flex-direction: row;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    flex: 4;
    background-color: ${colors.green};
  `};
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

const Spacer = styled.div`
  flex: 1;
`;

const NavBurger = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  ${media.tablet`
    display: none;
  `};

  & > span {
    height: 3px;
    background-color: #000;
    width: 30px;
  }
`;

const NavButton = styled(Link)`
  color: #fff;
  text-transform: capitalize;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  margin: 1rem 0;
  line-height: 25px;
  &:hover {
    color: ${colors.grey};
  }
  ${media.tablet`
    margin: 0 1rem 0 0;
  `};
`;

const LogoutLink = styled.button`
  color: #fff;
  background-color: transparent;
  border: 0;
  text-transform: capitalize;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: 'Bitter', serif;
  cursor: pointer;
  margin: 1rem 0;
  &:hover {
    color: ${colors.grey};
  }

  ${media.tablet`
    margin: 0;
  `};
`;

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.showLinksList = this.showLinksList.bind(this);
    this.linkList = React.createRef();
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  showLinksList() {
    if (
      this.linkList.current.style.display === ''
      || this.linkList.current.style.display === 'none'
    ) {
      this.linkList.current.style.display = 'flex';
    } else {
      this.linkList.current.style.display = 'none';
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const logout = <LogoutLink onClick={this.onLogoutClick.bind(this)}>Выйти</LogoutLink>;
    return (
      <Nav>
        <Logo to="/">Todo</Logo>
        <Spacer />
        <NavBurger onClick={this.showLinksList}>
          <span />
          <span />
          <span />
        </NavBurger>
        <Links ref={this.linkList}>
          <NavButton to="/about">о нас</NavButton>
          {isAuthenticated ? logout : null}
        </Links>
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
