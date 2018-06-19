import { observable, action } from 'mobx';

class ProfilesStore {
    @observable profiles = [];

    @action loadUsers = (users) => {
        this.profiles = users;
    };

    @action addUser = (user) => {
        this.profiles.push(user);
    };
}

const profilesStore = new ProfilesStore();

export default profilesStore;