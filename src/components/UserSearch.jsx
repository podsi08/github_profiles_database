import React from 'react';
import { observer, inject } from 'mobx-react';
import { searchUser, getUser, getUsersRepos } from '../services/api';
import { addUser } from '../services/storage';
import { toJS } from 'mobx';

@inject('searchedUsersStore')
@inject('profilesStore')
@observer
class UserSearch extends React.Component {
    addUserToDatabase = (id) => {
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
            let databaseUsernames = toJS(this.props.profilesStore.profiles).map(profile => profile.login);

            if (databaseUsernames.indexOf(profile.login) === -1) {
                let profilesToSave = [...toJS(this.props.profilesStore.profiles), profile];
                addUser(profilesToSave);

                this.props.profilesStore.addUserAction(profile);
            }
        })
    };

    handleInput = (event) => {
        this.props.searchedUsersStore.searchUser(event.target.value)
    };

    newSearching = () => {
        searchUser(this.props.searchedUsersStore.query).then(users => {
            this.props.searchedUsersStore.changeSearchedUsers(users)
        })
    };

    render(){
        return(
            <div className='user_search'>
                <input type='text' placeholder='user name' onChange={this.handleInput}/>
                <button onClick={this.newSearching}>FIND</button>
                {
                    this.props.searchedUsersStore.searchedUsers !== undefined && this.props.searchedUsersStore.searchedUsers.map((user) => {
                        return <div className='searched_user' key={user.id} onClick={() => this.addUserToDatabase(user.id)}>{user.login}</div>
                    })
                }
            </div>
        )
    }
}

export default UserSearch;
