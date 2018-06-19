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
    }
}

const profilesStore = new ProfilesStore();

export default profilesStore;
