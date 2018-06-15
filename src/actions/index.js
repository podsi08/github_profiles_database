export const searchUserAction = (name) => {
    console.log('searchUserAction', name)
    return {
        type: 'SEARCH_USERS',
        name
    }
};

export const loadUserAction = () => {
    return {
        type: 'LOAD_USERS'
    }
};

export const addUser = (id) => {
    return {
        type: 'ADD_USER',
        id
    }
};

export const refreshUserRepo = (user) => {
    return {
        type: 'REFRESH_USER',
        user
    }
};

export const refreshAll = () => {
    return {
        type: 'REFRESH_ALL'
    }
};

