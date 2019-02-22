import { ERRORS_CLEAR, ERRORS_GET } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ERRORS_GET:
      return action.payload;
    case ERRORS_CLEAR:
      return {};
    default:
      return state;
  }
}
