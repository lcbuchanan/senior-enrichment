import axios from 'axios';

/* -----------------    INITIAL STATE    ------------------ */
//state.students:

const initialState = [];

/* -----------------    ACTIONS     ------------------ */

const GET_STUDENTS = 'GET_STUDENTS';
const REMOVE_STUDENT_FROM_STATE = 'REMOVE_STUDENT_FROM_STATE';
const ADD_NEW_STUDENT_TO_STATE = 'ADD_NEW_STUDENT_TO_STATE';

/* ------------   ACTION CREATORS     ------------------ */


const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students
  }
}

const removeStudentFromState = (studentId) => {
  return{
    type: REMOVE_STUDENT_FROM_STATE,
    studentId
  }
}

const addNewStudentToState = (student) => {
  return{
    type: ADD_NEW_STUDENT_TO_STATE,
    student
  }
}


/* ------------       REDUCER     ------------------ */

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case REMOVE_STUDENT_FROM_STATE:
      return [...state].filter(student => {
        return student.id !== +action.studentId
      });
    case ADD_NEW_STUDENT_TO_STATE:
      return [...state, action.student];
    default: return state;
  }
}


/* ------------       DISPATCHERS     ------------------ */


export const fetchStudents = () => dispatch => {
  axios.get('/api/students')
  .then(res => res.data)
  .then(students => dispatch(getStudents(students)))
}

export const deleteStudentFromDb = (studentId) => dispatch => {
  dispatch(removeStudentFromState(studentId));
  axios.delete(`/api/students/${studentId}`)
  .then(res => console.log('response from delete', res))
  .catch(err => console.error(err))
}

export const postNewStudent = (name, campus) => dispatch => {
  axios.post(`/api/students/`)
  .then(student => dispatch(addNewStudentToState(student)))
  .catch(err => console.error(err));
}
