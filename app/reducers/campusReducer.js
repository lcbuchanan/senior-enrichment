import axios from 'axios';

/* -----------------    INITIAL STATE    ------------------ */
//state.campuses:

const initialState = [];

/* -----------------    ACTIONS     ------------------ */

const GET_CAMPUSES = 'GET_CAMPUSES';


/* ------------   ACTION CREATORS     ------------------ */


const getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
}


/* ------------       REDUCER     ------------------ */

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    default: return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */


export const fetchCampuses = () => dispatch => {
  axios.get('/api/campuses')
  .then(res => res.data)
  .then(campuses => dispatch(getCampuses(campuses)))
  .catch(err => console.error(err));
}
