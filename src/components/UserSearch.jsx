import React from 'react';
import { connect } from 'react-redux';
import {
    addUserAction,
    searchUserAction,
    searchUserSuccessAction
} from "../actions";
import { searchUser, getUser, getUsersRepos } from '../services/api';
import {addUser } from '../services/storage';

class UserSearch extends React.Component {

    addUserToDatabase = (id) => {
        let profile = {};
        return  getUser(id).then(user => {
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
            let databaseUsernames = this.props.profiles.profiles.map(profile => profile.login);

            if (databaseUsernames.indexOf(profile.login) === -1){
                let profilesToSave = [profile, ...this.props.profiles.profiles];
                addUser(profilesToSave);
                this.props.add(profile);
            }
        })
    };


    render(){
        let input;
        console.log(this.props);
        return(
            <div className='user_search'>
                <input ref={node => input = node} type='text' placeholder='user name'/>
                <button onClick={() => this.props.search(input.value)}>FIND</button>
                {
                    this.props.searchedUsers.users.map((user) => {
                        return <div className='searched_user' key={user.id} onClick={() => this.addUserToDatabase(user.id)}>{user.login}</div>
                    })
                }
                {
                    this.props.searchedUsers.loading && <div>Ładowanie...</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchedUsers: state.searchedUsers,
        profiles: state.profiles
    }
};

const mapDispatchToProps = (dispatch) => {
    //po kliknięciu w przysisk wyszukiwania wykonywana jest funkcja this.props.search, która najpierw wysyła akcję searchUserAction,
    //wyszukuje użytkowników (searchUser(name)) i kiedy otrzymam odpowiedź, to wysyłana jest akcja searchUserSuccessAction(users)
    return {
        search: (name) => {
            dispatch(searchUserAction());
            return searchUser(name).then(users => {
                dispatch(searchUserSuccessAction(users))
            })
        },
        //w mapDispatchToProps definiuję jakie akcje będą wysyłane
        //operacje które wykonuje po dodaniu użytkownika, a które wykorzystują aktualny stan, definiuję wewnątrz komponentu
        //(tam poprzez this.props.profiles mam dostęp do stanu)
        add: (profile) => {
            return dispatch(addUserAction(profile));
        }
    }
};

UserSearch = connect(mapStateToProps, mapDispatchToProps)(UserSearch);

export default UserSearch;
