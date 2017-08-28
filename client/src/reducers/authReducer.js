import { FETCH_USER } from '../actions/types';

//null doesn't no if logged in or not action.payload shows if logged in or false not
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;

    default:
      return state;
  }
}
