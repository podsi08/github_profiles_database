import React from 'react';
import PubSub from 'pubsub-js';
import Profile from './Profile';
import UserSearch from './UserSearch';
import { getUsers } from "../services/storage";
import { subscribe } from "../services/pubsub";

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

    componentDidMount() {
        //po otrzymaniu odpowiedzi z local storage zmieniam state
        this.loadUsers();

        //nasłuchuje zdarzeń z wiadomością 'NEW USER'
        //w komponencie UserSearch po kliknięciu w użytkownika wykona się funkcja addUser, która dodaje użytkownika do bazy
        //po czym 'publikuje' zdarzenie - publish('NEW USER')
        //w momencie otrzymania wiadomości o zdarzeniu, wykona się funkcja podana w subscribe jako drugi parametr

        this.token = PubSub.subscribe('NEW USER', this.loadUsers);
        // subscribe((dataPayload) => {
        //     console.log("PRZYSZLY DANE", dataPayload);
        //     this.loadUsers();
        // });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }


    render(){
        let profilesToRender = [];

        //z tablicy z profilami załadowanej do state z local storage tworzę listę dodanych do bazy użytkowników
        this.state.profiles.map(profile => {
            profilesToRender.push(<Profile key={profile.login} login={profile.login} date={profile.date} repos={profile.repos}/>)
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