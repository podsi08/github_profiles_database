import { searchUser } from "../services/api";
import {SEARCH_USERS, SEARCH_USERS_SUCCESS} from "../actions";

const searchedUsers = (state = [], action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return [...state];

        case SEARCH_USERS_SUCCESS:
            return action.users;

        default:
            return state;
    }
};

export default searchedUsers;