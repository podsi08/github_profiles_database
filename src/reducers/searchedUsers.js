import { searchUser } from "../services/api";
import {SEARCH_USERS, SEARCH_USERS_SUCCESS} from "../actions";

const INITIAL_STATE = {
    users: [],
    loading: false
};

const searchedUsers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                users: [],
                loading: true
            };

        case SEARCH_USERS_SUCCESS:
            return {
                users: action.users,
                loading: false
            };

        default:
            return state;
    }
};

export default searchedUsers;