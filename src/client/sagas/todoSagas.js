import {
  takeEvery, takeLatest, call, put
} from 'redux-saga/effects';
import axios from 'axios';
import {
  TODOS_GET,
  TODOS_GET_SUCCESS,
  TODO_ADD,
  TODO_ADD_SUCCESS,
  ERRORS_GET,
  TODO_DELETE,
  TODO_DELETE_SUCCESS,
  TODO_UPDATE,
  TODO_UPDATE_SUCCESS
} from '../actions/types';

// add todo logic

// worker saga
function* addTodo(action) {
  try {
    const todos = yield call(axios.post, '/api/todos', action.data);
    yield put({ type: TODO_ADD_SUCCESS, payload: todos.data });
  } catch (err) {
    yield put({ type: ERRORS_GET, payload: err });
  }
}

export function addTodoRequest(data) {
  return { type: TODO_ADD, data };
}
// watcher saga
export function* addTodoFlow() {
  yield takeLatest(TODO_ADD, addTodo);
}

// get todo logic

// worker saga
function* getMyTodos(action) {
  try {
    const todos = yield call(axios.get, '/api/todos/');
    yield put({ type: TODOS_GET_SUCCESS, payload: todos.data });
  } catch (err) {
    yield put({ type: ERRORS_GET, payload: err });
  }
}

export function getMyTodosRequest() {
  return { type: TODOS_GET };
}
// watcher saga
export function* getTodoFlow() {
  yield takeLatest(TODOS_GET, getMyTodos);
}

// Delete todo
function* deleteTodo(action) {
  try {
    const todo = yield call(axios.delete, `/api/todos/${action.id}`);
    yield put({ type: TODO_DELETE_SUCCESS, payload: action.id });
  } catch (err) {
    yield put({ type: ERRORS_GET, payload: err.data });
  }
}

export function deleteTodoRequest(id) {
  return { type: TODO_DELETE, id };
}

export function* deleteTodoFlow() {
  yield takeEvery(TODO_DELETE, deleteTodo);
}

// Update todo flow
function* updateTodo(action) {
  try {
    const res = yield call(axios.put, `/api/todos/${action.id}`, action.updatedTodo);
    yield put({
      type: TODO_UPDATE_SUCCESS,
      payload: action.updatedTodo
    });
  } catch (err) {
    yield put({ type: ERRORS_GET, payload: err });
  }
}

export function updateTodoRequest(id, updatedTodo) {
  return { type: TODO_UPDATE, id, updatedTodo };
}

// watcher
export function* updateTodoFlow() {
  yield takeLatest(TODO_UPDATE, updateTodo);
}
