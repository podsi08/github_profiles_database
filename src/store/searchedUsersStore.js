import { observable, action } from 'mobx';
import { searchUser } from "../services/api";

class SearchedUsersStore {
    @observable query = '';
    @observable searchedUsers = [];

    @action changeQuery = (name) => {
        this.query = name;
    };

    @action searchForUsers = () => {
        searchUser(this.query).then(users => {
            this.searchedUsers = users;
        });
    };
}

const searchedUsersStore = new SearchedUsersStore();

export default searchedUsersStore;