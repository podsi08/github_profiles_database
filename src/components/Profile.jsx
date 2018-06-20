import React from 'react';
import { connect } from 'react-redux';
import User from "./User";
import Repository from "./Repository";
import {refreshUserRepoAction} from "../actions";
import {getUsersRepos} from "../services/api";
import {addUser} from "../services/storage";

class Profile extends React.Component {
    // funkcja wykona się po kliknięciu w przycisk REFRESH, jako parametr przekazuję obiekt z danymi o użytkowniku
    refreshUserRepo = (user) => {
        let profile = {...user};

        //pobieram dane o repozytoriach użytkownika
        getUsersRepos(user.login).then(repos => {
            profile.repos = repos.map(repo => {
                return {
                    name: repo.name,
                    stars: repo.stargazers_count
                }
            });
            this.props.refresh(profile);

            //do localforage zapisuję listę profili z odświeżonymi repozytoriami użytkownika (przed zapisaniem ustawiam
            //showRepos na false, żeby po odświeżeniu strony, repozytoria użytkownika były niewidoczne)
            profile.showRepos = false;
            let profilesToSave = [...this.props.profiles.profiles];
            let profileIndex = profilesToSave.findIndex(user => user.login === profile.login);

            profilesToSave[profileIndex] = profile;

            addUser(profilesToSave);

        })
    };

    renderRepos = () => {
        if (this.props.profile.showRepos) {
            return (
                <div className='repositories'>
                    {
                        this.props.profile.repos.map(repo => {
                            return <Repository key={repo.name} repoName={repo.name} stars={repo.stars}/>
                        })
                    }
                    <button onClick={() => this.refreshUserRepo(this.props.profile)}>REFRESH</button>
                </div>
            )
        } else {
            return <div/>
        }
    };

    render(){
        return(
            <div className='profile'>
                <User login={this.props.profile.login} date={this.props.profile.date}/>
                {this.renderRepos()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {profiles: state.profiles}
};

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: user => {
            dispatch(refreshUserRepoAction(user))
        }
    }
};

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;