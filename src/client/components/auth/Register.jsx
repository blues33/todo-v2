import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { registerRequest } from '../../sagas/authSagas';
import { clearErrorsRequest } from '../../sagas/errorSagas';

import colors from '../../_helpers/colors';

const RegisterBox = styled.div`
  width: 360px;
  position: relative;
  z-index: 1;
  background-color: ${colors.grey};
  max-width: 360px;
  margin: 3rem auto 0 auto;
  padding: 2rem 2.5rem;
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
  background-color: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 1rem;
  padding: 0.6rem;
  font-size: 14px;
  &:focus {
    background-color: #fff;
  }
`;

const RegisterBtn = styled.button`
  text-transform: uppercase;
  outline: 0;
  background-color: ${colors.blue};
  width: 100%;
  border: 0;
  padding: 0.6rem;
  color: #ffffff;
  font-size: 0.7rem;
  cursor: pointer;
  transition: background-color 0.5s ease-out;
  &:hover {
    background-color: #9cd631;
  }
`;

const LoginLink = styled.p`
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

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClearErrors = this.onClearErrors.bind(this);
  }

  onClearErrors() {
    this.props.clearErrorsRequest();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerRequest(newUser, this.props.history);
  }

  render() {
    const { errors } = this.props;
    return (
      <RegisterBox>
        <h2>Регистрация</h2>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            placeholder="имя"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            onFocus={errors.name === undefined ? null : this.onClearErrors}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
          <Input
            type="text"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            onFocus={errors.email === undefined ? null : this.onClearErrors}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
          <Input
            type="password"
            placeholder="пароль"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            onFocus={errors.password === undefined ? null : this.onClearErrors}
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
          <Input
            type="password"
            placeholder="повторите пароль"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
            onFocus={errors.password2 === undefined ? null : this.onClearErrors}
          />
          {errors.password2 && <ErrorText>{errors.password2}</ErrorText>}
          <RegisterBtn>создать</RegisterBtn>
          <LoginLink>
            Уже зарегистрированы?
            {' '}
            <Link to="/login">Войдите</Link>
          </LoginLink>
        </form>
      </RegisterBox>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerRequest, clearErrorsRequest }
)(withRouter(Register));
