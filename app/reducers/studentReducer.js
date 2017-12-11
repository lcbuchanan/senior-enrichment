import axios from 'axios';

/* -----------------    INITIAL STATE    ------------------ */
//state.students:

const initialState = [];

/* -----------------    ACTIONS     ------------------ */

const GET_STUDENTS = 'GET_STUDENTS';
const REMOVE_STUDENT_FROM_STATE = 'REMOVE_STUDENT_FROM_STATE';
const ADD_NEW_STUDENT_TO_STATE = 'ADD_NEW_STUDENT_TO_STATE';
const UPDATE_STUDENT_ON_STATE = 'UPDATE_STUDENT_ON_STATE';
const UNENROLL_STUDENT = 'UNENROLL_STUDENT';

/* ------------   ACTION CREATORS     ------------------ */


const getStudents = (students) => {
  console.log("getStudents ran!")
  return {
    type: GET_STUDENTS,
    students
  }
}

const removeStudentFromState = (studentId) => {
  return {
    type: REMOVE_STUDENT_FROM_STATE,
    studentId
  }
}

const addNewStudentToState = (student) => {
  return {
    type: ADD_NEW_STUDENT_TO_STATE,
    student
  }
}

const updateStudentOnState = (student) => {
  return {
    type: UPDATE_STUDENT_ON_STATE,
    student
  }
}

const unenrollStudentOnState = student => {
  return {
    type: UNENROLL_STUDENT,
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
    case UPDATE_STUDENT_ON_STATE:
      //filter out the old student
      const filteredStudents = [...state].filter(student => {
        return student.id !== +action.student.id
      });
      //add the updated one
      return [...filteredStudents, action.student]
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

export const postNewStudent = (firstName, lastName, campusId) => dispatch => {
  axios.post(`/api/students/`, {
    firstName,
    lastName,
    campusId
  })
  .then(student => dispatch(addNewStudentToState(student)))
  .catch(err => console.error(err));
}

export const updateStudentThunk = student => dispatch => {
  axios.put(`/api/students/${student.id}`, student)
  .then(updatedStudent => dispatch(updateStudentOnState(updatedStudent)))
  .catch(err => console.error(err));
}


export const unenrollFromCampus = studentId => dispatch => {
  axios.put(`/api/students/${studentId}`, {campusId: null})
  .then(() => dispatch(fetchStudents()))
  .catch(err => console.error(err));
}

export const enrollThunk = (studentId, campusId) => dispatch => {
  console.log('enroll students ran!');
  axios.put(`/api/students/${studentId}`, {campusId: campusId})
  .then(() => dispatch(fetchStudents()))
  .catch(err => console.error(err))
}
