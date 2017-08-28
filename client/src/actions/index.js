import axios from 'axios';
import { FETCH_USER } from './types';

//res is the output from axios
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  //when we get a response dispatch a action with the response
  dispatch({ type: FETCH_USER, payload: res.data });
};
