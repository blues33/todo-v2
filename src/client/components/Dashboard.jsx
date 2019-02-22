import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Todo from './Todo';
import AddTodo from './AddTodo';
import colors from '../_helpers/colors';
import { media } from '../_helpers/mediaQuerriesBreakpoints';

import { getMyTodosRequest } from '../sagas/todoSagas';

const DashboardBox = styled.div`
  margin: 5rem auto 5rem auto;
  display: flex;
  flex-direction: column;
  width: 800px;
  max-width: 90%;
  background-color: ${colors.white};
  ${media.tablet`
    flex-direction: row;
 `};
`;

const Todos = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getMyTodosRequest();
  }

  render() {
    const { todos } = this.props.todos;
    let showTodos;
    if (!todos) {
      showTodos = '...loading';
    } else {
      showTodos = todos.map(todo => <Todo todo={todo} key={todo._id} priority={todo.priority} />);
    }

    return (
      <DashboardBox>
        <AddTodo />
        <Todos>
          <TodoList>{showTodos}</TodoList>
        </Todos>
      </DashboardBox>
    );
  }
}

Dashboard.propTypes = {
  todos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { getMyTodosRequest }
)(Dashboard);
