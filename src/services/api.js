let searchUser = (user) => {
    return fetch(`https://api.github.com/search/users?q=${user}`).then(response => {
        return response.json()
    }).then(data => {
        console.log(data.items);
        return data.items;
    });
};

let getUser = (id) => {
    return fetch(`https://api.github.com/user/${id}`).then(response => {
        return response.json()
    }).then(data => {
        return data
    });
};

let getUsersRepos = (login) => {
    return fetch(`https://api.github.com/users/${login}/repos`).then(response => {
        return response.json()
    }).then(data => {
        return data;
    })
};

export { searchUser, getUser, getUsersRepos };