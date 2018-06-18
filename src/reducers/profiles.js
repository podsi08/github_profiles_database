import {ADD_USER, LOAD_USERS, LOAD_USERS_SUCCESS} from "../actions";

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

        default:
            return state;

    }
};

export default profiles;

