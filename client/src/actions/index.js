import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      //when we get a response dispatch a action with the response
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
