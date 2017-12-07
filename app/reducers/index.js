import { combineReducers } from 'redux'
import students from './studentReducer';
import campuses from './campusReducer';

const rootReducer = combineReducers({students, campuses})

export default rootReducer
