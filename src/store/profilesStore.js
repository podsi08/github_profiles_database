import { observable, action } from 'mobx';
import {getUser, getUsersRepos} from "../services/api";
import {toJS} from "mobx";
import {addUser, getUsers} from "../services/storage";

class ProfilesStore {
    @observable profiles = [];

    @action loadUsers = () => {
        getUsers().then(users => {
            this.profiles = users;
        });
    };

    @action addUserAction = (id) => {
        let profile = {};

        return getUser(id).then(user => {
            profile.login = user.login;
            profile.date = user.created_at;
            profile.showRepos = false;

            console.log(typeof profile.date);
            return getUsersRepos(user.login);
        }).then(repos => {
            profile.repos = repos.map(repo => {
                return {
                    name: repo.name,
                    stars: repo.stargazers_count
                }
            });
            console.log(typeof profile.repos[0].stars)
            return profile;
        }).then(profile => {
            //sprawdzam, czy użytkownik znajduje się już w bazie, jeżeli nie, dodaję go do tablicy i nadpisuję tablicę do localforage
            let currentProfiles = toJS(this.profiles);

            let databaseUsernames = currentProfiles.map(profile => profile.login);

            if (databaseUsernames.indexOf(profile.login) === -1) {
                let profilesToSave = [...currentProfiles, profile];
                console.log(profilesToSave);
                addUser(profilesToSave);

                this.profiles.push(profile);
            }
        })
    };

    @action showUserRepos = (login) => {
        let newState = [...toJS(this.profiles)];

        let userIndex = newState.findIndex(profile => profile.login === login);

        let changedUser = {...newState[userIndex]};

        changedUser.showRepos = !changedUser.showRepos;

        newState[userIndex] = changedUser;

        this.profiles = newState;
    };

    @action refreshUserRepos = (user) => {
        let profile = {...user};

        let newState = [...toJS(this.profiles)];

        let userIndex = newState.findIndex(profile => profile.login === user.login);

        console.log(user.login, userIndex);

        getUsersRepos(user.login).then(repos => {
            console.log(repos);
            profile.repos = repos.map(repo => {
                return{
                    name: repo.name,
                    stars: repo.stargazers_count
                }
            });
            newState[userIndex] = profile;

            this.profiles = newState;

            //zapisuję tablicę z odświeżonymi repozytoriami użytkownika do localforage (ustawiam showRepos dla zmienionego użytkownika na false)
            newState[userIndex].showRepos = false;
            addUser(newState);
        })
    };

    @action refreshAll = () => {
        let promisesArray = [];

        let getChangedUserProfile = (user) => {
            return getUsersRepos(user.login).then(repos => {
                user.repos = repos.map(repo => {
                    return {
                        name: repo.name,
                        stars: repo.stargazers_count
                    }
                });
                return user
            });
        };

        toJS(this.profiles).forEach(profile => {
            promisesArray.push(getChangedUserProfile(profile))
        });

        Promise.all(promisesArray).then(users => {
            this.profiles = users;

            //zapisuję odświeżoną tablicę do localforage, ustawiam showRepos dla użytkowników na false żeby po odświeżeniu
            //strony, repozytoria użytkowników były niewidoczne
            users.forEach(user => {
                user.showRepos = false;
            });

            addUser(users);
        })
    }
}

const profilesStore = new ProfilesStore();

export default profilesStore;
