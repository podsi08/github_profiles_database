import React from 'react';
import { observer, inject } from 'mobx-react';
import { searchUser, getUser, getUsersRepos } from '../services/api';
import { addUser } from '../services/storage';

@inject('searchedUsersStore')
@observer
class UserSearch extends React.Component {
    // addUserToDatabase = (id) => {
    //     let profile = {};
    //
    //     //pobieram dane o użytkowniku, kiedy je otrzymam, pobieram dane o repozytoriach,
    //     //zapisuję dane do obiektu profile, który na koniec dodam do local storage
    //     return getUser(id).then((user) => {
    //         profile.login = user.login;
    //         profile.date = user.created_at;
    //
    //         return getUsersRepos(user.login);
    //     }).then(repos => {
    //         profile.repos = repos.map(repo => {
    //             return {
    //                 name: repo.name,
    //                 stars: repo.stargazers_count
    //             }
    //         });
    //
    //         return profile;
    //     }).then(profile => {
    //         //do tablicy z profilami przechowywanej w state dodaje użytkownika na którego kliknięto (jeżeli nie został już wcześniej dodany do bazy)
    //         let databaseUsernames = this.props.profiles.map(profile => profile.login);
    //
    //         if(databaseUsernames.indexOf(profile.login) === -1) {
    //             let profilesToSave = [profile, ...this.props.profiles];
    //             console.log("wywolanie addUser()");
    //             addUser(profilesToSave).then(() => {
    //                 PubSub.publish('NEW USER');
    //                 console.log("publish(NEW USER)");
    //             });
    //         }
    //     })
    // };

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
