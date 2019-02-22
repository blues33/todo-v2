import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trash from '../assets/img/rubbish-bin.svg';
import done from '../assets/img/checked.svg';

import { deleteTodoRequest, updateTodoRequest } from '../sagas/todoSagas';

const TodoItem = styled.div`
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-bottom: 1rem;
  font-family: 'Raleway', sans-serif;
  border-top: 1px solid #001011;
  border-bottom: 1px solid #001011;
  border-right: 1px solid #001011;

  &:hover {
    background-color: #fcfcfc;
  }
`;

const Text = styled.div`
  display: flex;
  flex: 1;
`;

const ManageTodo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 55px;
`;

const DeleteTodo = styled.img`
  width: 15px;
  height: 15px;
  &:hover {
    border: 1px solid black;
  }
  &:active {
    border: 1px solid #d80027;
    background-color: #d80027;
  }
`;

const UpdateTodo = styled.img`
  width: 15px;
  height: 15px;
  &:hover {
    border: 1px solid black;
  }
  &:active {
    border: 1px solid #6ac259;
    background-color: #6ac259;
  }
`;

class Todo extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.textRef = React.createRef();
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  componentDidMount() {
    const { priority } = this.props;
    const leftBorder = this.myRef.current;
    if (priority === 'low') {
      leftBorder.style.borderLeft = '5px solid #098c00';
    }
    if (priority === 'medium') {
      leftBorder.style.borderLeft = '5px solid #e06800';
    }
    if (priority === 'high') {
      leftBorder.style.borderLeft = '5px solid #bf0000';
    }

    const text = this.textRef.current;
    if (this.props.todo.completed) {
      text.style.color = 'grey';
      text.style.textDecoration = 'line-through';
    }
  }

  handleDeleteClick = (e) => {
    e.preventDefault();
    this.props.deleteTodoRequest(this.props.todo._id);
  };

  handleUpdateClick = () => {
    const updatedTodo = this.props.todo;
    updatedTodo.completed = !this.props.todo.completed;
    this.props.updateTodoRequest(this.props.todo._id, updatedTodo);
    // do stuff to ui
    const text = this.textRef.current;
    if (text.style.color === 'rgb(0, 0, 0)' && text.style.textDecoration === 'none') {
      text.style.color = 'grey';
      text.style.textDecoration = 'line-through';
    } else {
      text.style.color = 'rgb(0, 0, 0)';
      text.style.textDecoration = 'none';
    }
    console.log(this.props.todo);
  };

  render() {
    const { todo } = this.props;
    let todoText;

    if (todo) {
      todoText = todo.task;
    } else {
      todoText = '........';
    }

    return (
      <TodoItem ref={this.myRef}>
        <Text>
          <p ref={this.textRef} style={{ color: 'rgb(0, 0, 0)', textDecoration: 'none' }}>
            {todoText}
          </p>
        </Text>
        <ManageTodo>
          <UpdateTodo onClick={this.handleUpdateClick} src={done} alt="update todo" />
          <div>|</div>
          <DeleteTodo onClick={this.handleDeleteClick} src={trash} alt="delete todo" />
        </ManageTodo>
      </TodoItem>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  priority: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { deleteTodoRequest, updateTodoRequest }
)(Todo);
