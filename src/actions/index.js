export const searchUserAction = (name) => {
    console.log('searchUserAction')
    return {
        type: 'SEARCH_USERS',
        name
    }
};

export const addUser = (profile) => {
    return {
        type: 'ADD_USER',
        profile
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

