import { USER_SET } from '../actions/types';

const _ = require('lodash');

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_SET:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;
  }
}
