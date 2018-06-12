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
        console.log(data);
        let user = {
            login: data.login,
            date: data.created_at
        };
        return user
    });
};
//muszę dorzucić pobrane repozytoria użytkownika do obiektu user zapisywanego potem do local storage
let getUsersRepos = (login) => {
    return fetch(`https://api.github.com/users/${login}/repos`).then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
    })
};

export { searchUser, getUser};