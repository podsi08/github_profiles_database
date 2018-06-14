import React from 'react';
import PubSub from 'pubsub-js';
import Profile from './Profile';
import UserSearch from './UserSearch';
import { getUsers, addUser } from "../services/storage";
import {getUsersRepos} from "../services/api";

class ProfileList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            profiles: []
        }
    }

    loadUsers = () => {
        console.log("loadUsers()");
        getUsers().then(users => {
            this.setState({
                profiles: users
            })
        })
    };

    //funkcja wykona się po kliknięciu w przycisk REFRESH, jako parametr przekazuję obiekt z danymi o użytkowniku
    refreshUserRepo = (user) => {
        console.log('refresh', user);
        let profile = {...user};

        //tworzę tablicę użytkowników bez użytkownika dla którego będą pobierane nowe dane o repozytoriach
        let newProfilesArray = this.state.profiles.filter(profile => {
            return profile.login !== user.login;
        });

        //pobieram dane o repozytoriach
        getUsersRepos(user.login).then(repos => {
            profile.repos = repos.map(repo => {
                return {
                    name: repo.name,
                    stars: repo.stargazers_count
                }
            });
            //dodaję użytkownika do tablicy, która zostanie zapisana do local storage
            newProfilesArray.push(profile);

            addUser(newProfilesArray).then(() => {
                PubSub.publish('NEW USER');
            });
        })
    };

    componentDidMount() {
        //po otrzymaniu odpowiedzi z local storage zmieniam state
        this.loadUsers();

        //nasłuchuje zdarzeń z wiadomością 'NEW USER'
        //w komponencie UserSearch po kliknięciu w użytkownika wykona się funkcja addUser, która dodaje użytkownika do bazy
        //po czym 'publikuje' zdarzenie - publish('NEW USER')
        //w momencie otrzymania wiadomości o zdarzeniu, wykona się funkcja podana w subscribe jako drugi parametr
        this.token = PubSub.subscribe('NEW USER', this.loadUsers);
        console.log('subscribe');
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }


    render(){
        let profilesToRender = [];

        //z tablicy z profilami załadowanej do state z local storage tworzę listę dodanych do bazy użytkowników
        this.state.profiles.map(profile => {
            profilesToRender.push(<Profile key={profile.login} profile={profile} refreshUserRepo={this.refreshUserRepo}/>)
        });

        return(
            <div className='container'>
                <UserSearch profiles={this.state.profiles}/>
                {profilesToRender}
                <button>REFRESH ALL</button>
            </div>

        )
    }
}

export default ProfileList;