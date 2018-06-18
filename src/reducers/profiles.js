import {ADD_USER, LOAD_USERS, LOAD_USERS_SUCCESS, REFRESH_USER, SHOW_USER_REPOS} from "../actions";

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
            let userIndex = state.profiles.map(profile => profile.login).indexOf(action.user);
            let newProfilesArray = [...state.profiles];

            newProfilesArray[userIndex].showRepos = !newProfilesArray[userIndex].showRepos;

            return {
                profiles: newProfilesArray
            };

        case REFRESH_USER:
            console.log('REFRESH USER');
            let refreshUserIndex = state.profiles.map(profile => profile.login).indexOf(action.user.login);
            let newState = [...state.profiles];

            newState[refreshUserIndex] = action.user;

            return {
                profiles: newState
            };

        default:
            return state;

    }
};

export default profiles;

