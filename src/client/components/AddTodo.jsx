import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import colors from '../_helpers/colors';

import { addTodoRequest } from '../sagas/todoSagas';
import { clearErrorsRequest } from '../sagas/errorSagas';

const Panel = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #545e56;
  padding: 0 0.5rem;
  flex: 1;
  & > h3 {
    text-transform: capitalize;
    color: ${colors.white};
    font-family: 'Bitter', serif;
    font-size: 1.2rem;
    margin: 0.8rem;
  }
`;

const H4 = styled.h4`
  text-transform: capitalize;
  color: ${colors.white};
  margin: 0.5rem 0;
  font-family: 'Bitter', serif;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 64px;
`;

const Label = styled.label`
  position: relative;
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
  color: #fff;
  border-right: 5px solid ${props => props.inputColor || 'palevioletred'};
  padding-left: 35px;

  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  &:hover input ~ span {
    background-color: #ccc;
  }
  & > input:checked ~ span {
    background-color: ${colors.green};
  }

  & > input:checked ~ span:after {
    display: block;
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: #7da3a1;
  border-radius: 50%;

  &:after {
    content: '';
    position: absolute;
    display: none;
    top: 6px;
    left: 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.green};
  }
`;

const AddBtn = styled.button`
  border: 0;
  width: 100%;
  cursor: pointer;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #98ce00;
  color: #fff;
  font-family: 'Bitter', serif;
  transition: background-color 0.5s ease-out;
  &:hover {
    background-color: #000;
  }
`;

const ErrorText = styled.div`
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-size: 0.8rem;
  width: 172px;
  background-color: ${colors.black};
`;

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getDoneBy: null,
      priority: null,
      task: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClearErrors = this.onClearErrors.bind(this);
  }

  onClearErrors = () => {
    this.props.clearErrorsRequest();
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      task: this.state.task,
      priority: this.state.priority,
      get_done_by: this.state.getDoneBy
    };
    console.log(newTodo);
    this.props.addTodoRequest(newTodo);

    // Clear State
    this.setState({
      task: '',
      priority: null,
      getDoneBy: null,
      errors: {}
    });
  };

  render() {
    const { errors } = this.props;
    return (
      <Panel>
        <h3>add todo</h3>
        <form onSubmit={this.onSubmit}>
          <input
            name="task"
            type="text"
            onChange={this.onChange}
            value={this.state.task}
            onFocus={errors.todo_text === undefined ? null : this.onClearErrors}
          />
          {errors.task && <ErrorText>{errors.task}</ErrorText>}
          <H4>priority</H4>
          <hr />
          <InputBox>
            <Label inputColor="#bf0000">
              <input
                type="radio"
                name="priority"
                value="high"
                onChange={this.onChange}
                checked={this.state.priority === 'high'}
                onFocus={errors.priority === undefined ? null : this.onClearErrors}
              />
              <Checkmark />
              high
            </Label>
            <Label inputColor="#e06800">
              <input
                type="radio"
                name="priority"
                value="medium"
                onChange={this.onChange}
                checked={this.state.priority === 'medium'}
                onFocus={errors.priority === undefined ? null : this.onClearErrors}
              />
              <Checkmark />
              medium
            </Label>
            <Label inputColor="#098c00">
              <input
                type="radio"
                name="priority"
                value="low"
                onChange={this.onChange}
                checked={this.state.priority === 'low'}
                onFocus={errors.priority === undefined ? null : this.onClearErrors}
              />
              <Checkmark />
              low
            </Label>
            {errors.priority && <ErrorText>{errors.priority}</ErrorText>}
          </InputBox>
          <hr />
          <H4>Get done by:</H4>
          <SingleDatePicker
            date={this.state.getDoneBy} // momentPropTypes.momentObj or null
            onDateChange={getDoneBy => this.setState({ getDoneBy })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="your_unique_id" // PropTypes.string.isRequired,
            numberOfMonths={1}
            small
            daySize={30}
          />

          {errors.get_done_by && <ErrorText>{errors.get_done_by}</ErrorText>}
          <AddBtn type="submit">Add</AddBtn>
        </form>
      </Panel>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTodoRequest, clearErrorsRequest }
)(AddTodo);
