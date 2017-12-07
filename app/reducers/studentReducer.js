import axios from 'axios';

/* -----------------    INITIAL STATE    ------------------ */
//state.students:

const initialState = [];

/* -----------------    ACTIONS     ------------------ */

const GET_STUDENTS = 'GET_STUDENTS';


/* ------------   ACTION CREATORS     ------------------ */


const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
}


/* ------------       REDUCER     ------------------ */

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    default: return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */


export const fetchStudents = () => dispatch => {
  axios.get('/api/students')
  .then(res => res.data)
  .then(students => dispatch(getStudents(students)))
}
