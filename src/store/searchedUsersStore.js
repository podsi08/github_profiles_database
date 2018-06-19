import { observable, action } from 'mobx'

class SearchedUsersStore {
    @observable query = '';
    @observable searchedUsers = [];

    @action searchUser = (name) => {
        this.query = name;
    };

    @action changeSearchedUsers = (users) => {
        this.searchedUsers = users;
    };
}

const searchedUsersStore = new SearchedUsersStore();

export default searchedUsersStore;