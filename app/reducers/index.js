import { combineReducers } from 'redux'
import students from './studentReducer';
import campuses from './campusReducer';
import selectedCampus from './selectedCampusReducer';

const rootReducer = combineReducers({students, campuses, selectedCampus})

export default rootReducer
