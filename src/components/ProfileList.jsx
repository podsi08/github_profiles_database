import React from 'react';
import PubSub from 'pubsub-js';
import Profile from './Profile';
import UserSearch from './UserSearch';
import { getUsers, addUser } from "../services/storage";
import { getUsersRepos } from "../services/api";

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
        //tworzę nową tablicę w której podmienię użytkownika dla którego mają zostać odświeżone repozytoria
        let newProfilesArray = [...this.state.profiles];
        let userIndex = newProfilesArray.indexOf(user);

        let profile = {...user};

        //pobieram dane o repozytoriach
        getUsersRepos(user.login).then(repos => {
            profile.repos = repos.map(repo => {
                return {
                    name: repo.name,
                    stars: repo.stargazers_count
                }
            });

            //podmieniam stary profil użytkownika na profil z nowymi repozytoriami
            newProfilesArray[userIndex] = profile;

            addUser(newProfilesArray).then(() => {
                PubSub.publish('NEW USER');
            });
        })
    };

    refreshAll = () => {
        let newProfilesArray = [];

        let getChangedUserProfile = (user) => {
            getUsersRepos(user.login).then(repos => {
                user.repos = repos.map(repo => {
                    return {
                        name: repo.name,
                        stars: repo.stargazers_count
                    }
                })
            });
            return user
        };

        //do nowe, pustej tablicy dodaję po kolei użytkowników ze zmienionymi repozytoriami
        this.state.profiles.forEach(profile => {
            newProfilesArray.push(getChangedUserProfile(profile))
        });

        //kiedy repozytoria dla wszystkich użytkownikó będę uaktualnine, zapisuję je do localforage i uaktualniam na stronie
        Promise.all(newProfilesArray).then(users => {
            console.log(users);
            addUser(users);
        }).then(() => {
            PubSub.publish('NEW USER');
        });
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
                <button onClick={this.refreshAll}>REFRESH ALL</button>
            </div>

        )
    }
}

export default ProfileList;