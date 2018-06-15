import { getUsers, addUser } from "../services/storage";
import { getUser, getUsersRepos } from "../services/api";

const profiles = (state = [], action) => {
    switch(action.type){
        case 'LOAD_USERS':
            console.log('LOAD USERS');
            return getUsers().then(users => {
                return users;
            });

        case 'ADD_USER':
            let profile = {};

            return getUser(action.id).then((user) => {
                profile.login = user.login;
                profile.date = user.created_at;

                return getUsersRepos(user.login);
            }).then(repos => {
                profile.repos = repos.map(repo => {
                    return {
                        name: repo.name,
                        stars: repo.stargazers_count
                    }
                });
                return profile;
            }).then(profile => {
                //do tablicy z profilami przechowywanej w state dodaje użytkownika na którego kliknięto (jeżeli nie został już wcześniej dodany do bazy)
                let databaseUsernames = this.state.map(profile => profile.login);

                if(databaseUsernames.indexOf(profile.login) === -1) {
                    let newState = [profile, ...state];
                    addUser(newState);
                    return newState;
                }

            })

    }
};

export default profiles;

