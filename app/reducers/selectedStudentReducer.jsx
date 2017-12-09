import axios from 'axios';

/* -----------------    INITIAL STATE    ------------------ */


const initialState = {};


/* -----------------    ACTIONS     ------------------ */

const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT';

/* ------------   ACTION CREATORS     ------------------ */


export const setSelectedStudent = (student) => {
  return {
    type: SET_SELECTED_STUDENT,
    student
  }
}

/* ------------       REDUCER     ------------------ */

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_STUDENT:
      return action.student;
    default: return state;
  }
}

/* ------------       DISPATCHERS     ------------------ */


export const fetchSelectedStudent = studentId => dispatch => {
  axios.get(`/api/students/${studentId}`)
  .then(res => res.data)
  .then(student => {
    console.log("student from axios get: ", student);
    dispatch(setSelectedStudent(student))
  })
  .catch(err => console.error(err));
}
