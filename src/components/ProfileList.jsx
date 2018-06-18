import React from 'react';
import Profile from './Profile';
import UserSearch from './UserSearch';
import { getUsers } from "../services/storage";
import { getUsersRepos } from "../services/api"
import {connect} from "react-redux";
import { loadUserAction, loadUsersSuccessAction, refreshAllAction } from "../actions";

class ProfileList extends React.Component {

    refreshAll = () => {
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

        //dodaję promisy do tablicy
        this.props.profiles.profiles.forEach(profile => {
            promisesArray.push(getChangedUserProfile(profile))
        });

        //Promise.all jako parametr przyjmuje tablicę z promisami
        //kiedy repozytoria dla wszystkich użytkownikó będę uaktualnine, zapisuję je do localforage i uaktualniam na stronie
        Promise.all(promisesArray).then(users => {
            this.props.refresh(users);
        })
    };


    componentDidMount(){
        this.props.loadUsers();
    }

    render(){
        let profilesToRender = [];
        console.log("renderuje liste");

        //z tablicy z profilami ze store tworzę listę dodanych do bazy użytkowników
        this.props.profiles.profiles.map(profile => {
            profilesToRender.push(<Profile key={profile.login} profile={profile} refreshUserRepo={this.refreshUserRepo}/>)
        });

        return(
            <div className='container'>
                <UserSearch/>
                {profilesToRender}
                <button onClick={this.refreshAll}>REFRESH ALL</button>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return { profiles: state.profiles}
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => {
            dispatch(loadUserAction());
            return getUsers()
                .then(users => {
                    users !== null && dispatch(loadUsersSuccessAction(users));
                });
        },
        refresh: (profiles) => {
            dispatch(refreshAllAction(profiles))
        }


    }
};


ProfileList = connect(mapStateToProps, mapDispatchToProps)(ProfileList);

export default ProfileList;