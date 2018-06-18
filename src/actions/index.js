export const SEARCH_USERS = 'SEARCH_USERS';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const LOAD_USERS = 'LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const ADD_USER = 'ADD_USER';
export const REFRESH_USER = 'REFRESH_USER';
export const REFRESH_ALL = 'REFRESH_ALL';


export const searchUserAction = () => {
    return {
        type: SEARCH_USERS
    }
};

export const searchUserSuccessAction = (users) => {
    return {
        type: SEARCH_USERS_SUCCESS,
        users
    }
};

export const loadUserAction = () => {
    return {
        type: LOAD_USERS
    }
};

export const loadUsersSuccessAction = (profiles) => {
    return {
        type: LOAD_USERS_SUCCESS,
        profiles
    }
};

export const addUserAction = (profile) => {
    return {
        type: ADD_USER,
        profile
    }
};

export const refreshUserRepo = (user) => {
    return {
        type: REFRESH_USER,
        user
    }
};

export const refreshAll = () => {
    return {
        type: REFRESH_ALL
    }
};

