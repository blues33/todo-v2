import {
  TODOS_GET_SUCCESS,
  TODO_ADD_SUCCESS,
  TODO_DELETE_SUCCESS,
  TODO_UPDATE_SUCCESS
} from '../actions/types';

const initialState = {
  todos: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TODO_ADD_SUCCESS:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
    case TODOS_GET_SUCCESS:
      return {
        ...state,
        todos: action.payload
      };
    case TODO_DELETE_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      };
    case TODO_UPDATE_SUCCESS:
      return {
        ...state,
        todos: state.todos.map(todo => (todo.id === action.payload.id ? (todo = action.payload) : todo))
      };
    default:
      return state;
  }
}
