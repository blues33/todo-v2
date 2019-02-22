import { ERRORS_CLEAR } from '../actions/types';

export function clearErrorsRequest() {
  return { type: ERRORS_CLEAR };
}
