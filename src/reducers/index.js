import { combineReducers } from 'redux';
import searchedUsers from './searchedUsers';
import profiles from './profiles';

export default combineReducers({
    searchedUsers,
    profiles
})