import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginRequest } from '../../sagas/authSagas';
import { clearErrorsRequest } from '../../sagas/errorSagas';

import colors from '../../_helpers/colors';

const LoginBox = styled.div`
  width: 360px;
  position: relative;
  z-index: 1;
  background-color: ${colors.grey};
  max-width: 360px;
  margin: 3rem auto;
  padding: 2.5rem;
  text-align: center;

  & > h2 {
    color: #fff;
    margin-top: 0;
    font-size: 2rem;
    letter-spacing: 1px;
    margin-bottom: 1rem;
    font-family: 'Bitter', serif;
  }
`;

const Input = styled.input`
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 1rem;
  padding: 0.6rem;
  font-size: 14px;
  &:focus {
    background-color: #fff;
  }
`;

const LoginBtn = styled.button`
  text-transform: uppercase;
  outline: 0;
  background-color: ${colors.blue};
  width: 100%;
  border: 0;
  padding: 0.6rem;
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.5s ease-out;
  &:hover {
    background-color: #9cd631;
  }
`;

const RegisterLink = styled.p`
  margin: 15px 0 0;
  color: #fff;
  font-size: 12px;
  & > a {
    color: #86ac41;
  }
`;

const ErrorText = styled.div`
  color: #fff;
  position: relative;
  top: -16px;
  font-size: 0.8rem;
  background-color: ${colors.black};
  border-right: 3px solid red;
  border-left: 3px solid red;
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClearErrors = this.onClearErrors.bind(this);
  }

  onClearErrors = () => {
    this.props.clearErrorsRequest();
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginRequest(data, this.props.history);
  }

  render() {
    const { errors } = this.props;
    return (
      <LoginBox>
        <h2>Войти</h2>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.onChange}
            value={this.state.email}
            onFocus={errors.email === undefined ? null : this.onClearErrors}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <Input
            type="password"
            placeholder="пароль"
            name="password"
            onChange={this.onChange}
            value={this.state.password}
            onFocus={errors.password === undefined ? null : this.onClearErrors}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          <LoginBtn>войти</LoginBtn>
          <RegisterLink>
            Нет аккаунта?
            {' '}
            <Link to="/register">Создайте его за пару секунд</Link>
          </RegisterLink>
        </form>
      </LoginBox>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginRequest: PropTypes.func.isRequired,
  clearErrorsRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginRequest, clearErrorsRequest }
)(withRouter(Login));
