import { fork } from 'redux-saga/effects';

import { registerFlow, loginFlow } from './authSagas';
import {
  addTodoFlow, getTodoFlow, deleteTodoFlow, updateTodoFlow
} from './todoSagas';
import { errorsFlow } from './errorSagas';

export function* rootSaga() {
  yield fork(registerFlow);
  yield fork(loginFlow);
  yield fork(addTodoFlow);
  yield fork(getTodoFlow);
  yield fork(deleteTodoFlow);
  yield fork(updateTodoFlow);
}
