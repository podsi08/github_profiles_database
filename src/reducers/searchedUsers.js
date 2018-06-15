import { searchUser } from "../services/api";

const searchedUsers = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH_USERS':
            return searchUser(action.name).then(data => {
                console.log([...state, data]);
                return [...state, data];
            });
        default:
            return state;
    }
};

export default searchedUsers;