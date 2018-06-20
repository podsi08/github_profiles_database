import {ADD_USER, LOAD_USERS, LOAD_USERS_SUCCESS, REFRESH_ALL, REFRESH_USER, SHOW_USER_REPOS} from "../actions";
import { addUser } from "../services/storage";

const INITIAL_STATE = {
    profiles: [],
    loading: false
};

const profiles = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LOAD_USERS:
            return {
                profiles: [],
                loading: true
            };

        case LOAD_USERS_SUCCESS:
            return {
                profiles: action.profiles,
                loading: false
            };

        case ADD_USER:
            return {
                profiles: [action.profile, ...state.profiles]
            };

        case SHOW_USER_REPOS:
            //w tablicy z użytkownikami przechowywanej w store wyszukuję użytkownika, dla którego mają zostać pokazane repozytoria,
            //tworzę nową tablicę w której zmieniam dla użytkownika showRepos z false na true (lub na odwrót) i zwracam nowy stan
            let userIndex = state.profiles.findIndex(profile => profile.login === action.user);

            let newProfilesArray = [...state.profiles];

            //tworzę nowego użytkownika
            let changedUser = {...newProfilesArray[userIndex]};
            changedUser.showRepos = !changedUser.showRepos;

            newProfilesArray[userIndex] = changedUser;

            return {
                profiles: newProfilesArray
            };

        case REFRESH_USER:
            console.log('REFRESH USER');
            // let refreshUserIndex = state.profiles.map(profile => profile.login).indexOf(action.user.login);
            let refreshUserIndex = state.profiles.findIndex(profile => profile.login === action.user.login);

            let newState = [...state.profiles];

            newState[refreshUserIndex] = action.user;

            return {
                profiles: newState
            };

        case REFRESH_ALL:
            console.log('REFRESH ALL');

            return {
                profiles: action.profiles
            };

        default:
            return state;

    }
};

export default profiles;

