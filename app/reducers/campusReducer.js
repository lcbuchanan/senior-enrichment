import axios from 'axios';

/* -----------------    INITIAL STATE    ------------------ */
//state.campuses:

const initialState = [];

/* -----------------    ACTIONS     ------------------ */

const GET_CAMPUSES = 'GET_CAMPUSES';
const REMOVE_CAMPUS_FROM_STATE = 'REMOVE_CAMPUS_FROM_STATE';
const ADD_NEW_CAMPUS_TO_STATE = 'ADD_NEW_CAMPUS_TO_STATE';
const UPDATE_CAMPUS_ON_STATE = 'UPDATE_CAMPUS_ON_STATE';


/* ------------   ACTION CREATORS     ------------------ */


const getCampuses = (campuses) => {
  return {
    type: GET_CAMPUSES,
    campuses
  }
}

const removeCampusFromState = (campusId) => {
  return {
    type: REMOVE_CAMPUS_FROM_STATE,
    campusId
  }
}

const addNewCampusToState = (campus) => {
  return {
    type: ADD_NEW_CAMPUS_TO_STATE,
    campus
  }
}

const updateCampusOnState = campus => {
  return {
    type: UPDATE_CAMPUS_ON_STATE,
    campus
  }
}


/* ------------       REDUCER     ------------------ */

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case REMOVE_CAMPUS_FROM_STATE:
      return [...state].filter(campus => {
        return campus.id !== +action.campusId
      });
    case ADD_NEW_CAMPUS_TO_STATE:
      return [...state, action.campus];
    case UPDATE_CAMPUS_ON_STATE:
      const filteredCampuses = [...state].filter(campus => {
        return campus.id !== +action.campus.id
      });
      return [...filteredCampuses, action.campus]
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

export const deleteCampusThunk = campusId => dispatch => {
  dispatch(removeCampusFromState(campusId))
  axios.delete(`/api/campuses/${campusId}`)
  .then(res => console.log('response from delete', res))
  .catch(err => console.error(err))
}

export const postNewCampus = (name, imageUrl, description) => dispatch => {
  axios.post(`/api/campuses`, {
    name,
    imageUrl,
    description
  })
  .then(campus => dispatch(addNewCampusToState(campus)))
  .catch(err => console.error(err))
}

export const updateCampusThunk = campus => dispatch => {
  axios.put(`/api/campuses/${campus.id}`, campus)
  .then(updatedCampus => dispatch(updateCampusOnState(updatedCampus)))
  .catch(err => console.error(err));
}
