import { combineReducers } from 'redux'
import students from './studentReducer';
import campuses from './campusReducer';
import selectedCampus from './selectedCampusReducer';
import selectedStudent from './selectedStudentReducer';

const rootReducer = combineReducers({students, campuses, selectedCampus, selectedStudent})

export default rootReducer
