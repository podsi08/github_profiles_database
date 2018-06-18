import React from 'react';
import Profile from './Profile';
import UserSearch from './UserSearch';
import { getUsers, addUser } from "../services/storage";
import { getUsersRepos } from "../services/api";
import {connect} from "react-redux";
import {loadUserAction, loadUsersSuccessAction, searchUserAction} from "../actions";

class ProfileList extends React.Component {
//     constructor(props){
//         super(props);
//
//         this.state = {
//             profiles: []
//         }
//     }
//
//     loadUsers = () => {
//         console.log("loadUsers()");
//         getUsers().then(users => {
//             this.setState({
//                 profiles: users
//             })
//         })
//     };
//
//     //funkcja wykona się po kliknięciu w przycisk REFRESH, jako parametr przekazuję obiekt z danymi o użytkowniku
//     refreshUserRepo = (user) => {
//         //tworzę nową tablicę w której podmienię użytkownika dla którego mają zostać odświeżone repozytoria
//         let newProfilesArray = [...this.state.profiles];
//         let userIndex = newProfilesArray.indexOf(user);
//
//         let profile = {...user};
//
//         //pobieram dane o repozytoriach
//         getUsersRepos(user.login).then(repos => {
//             profile.repos = repos.map(repo => {
//                 return {
//                     name: repo.name,
//                     stars: repo.stargazers_count
//                 }
//             });
//
//             //podmieniam stary profil użytkownika na profil z nowymi repozytoriami
//             newProfilesArray[userIndex] = profile;
//
//             addUser(newProfilesArray).then(() => {
//                 PubSub.publish('NEW USER');
//             });
//         })
//     };
//
//     refreshAll = () => {
//         let promisesArray = [];
//
//         let getChangedUserProfile = (user) => {
//             return getUsersRepos(user.login).then(repos => {
//                 user.repos = repos.map(repo => {
//                     return {
//                         name: repo.name,
//                         stars: repo.stargazers_count
//                     }
//                 });
//                 return user
//             });
//         };
//
//         //dodaję promisy do tablicy
//         this.state.profiles.forEach(profile => {
//             promisesArray.push(getChangedUserProfile(profile))
//         });
//
//         //Promise.all jako parametr przyjmuje tablicę z promisami
//         //kiedy repozytoria dla wszystkich użytkownikó będę uaktualnine, zapisuję je do localforage i uaktualniam na stronie
//         Promise.all(promisesArray).then(users => {
//             console.log(users);
//             addUser(users);
//         }).then(() => {
//             PubSub.publish('NEW USER');
//         });
//     };
//
//     componentDidMount() {
//         //po otrzymaniu odpowiedzi z local storage zmieniam state
//         this.loadUsers();
//
//         //nasłuchuje zdarzeń z wiadomością 'NEW USER'
//         //w komponencie UserSearch po kliknięciu w użytkownika wykona się funkcja addUser, która dodaje użytkownika do bazy
//         //po czym 'publikuje' zdarzenie - publish('NEW USER')
//         //w momencie otrzymania wiadomości o zdarzeniu, wykona się funkcja podana w subscribe jako drugi parametr
//         this.token = PubSub.subscribe('NEW USER', this.loadUsers);
//         console.log('subscribe');
//     }
//
//     componentWillUnmount() {
//         PubSub.unsubscribe(this.token);
//     }
//
//
    componentDidMount(){
        this.props.loadUsers();
    }

    render(){
        let profilesToRender = [];

        //z tablicy z profilami ze store tworzę listę dodanych do bazy użytkowników
        this.props.profiles.profiles.map(profile => {
            profilesToRender.push(<Profile key={profile.login} profile={profile} refreshUserRepo={this.refreshUserRepo}/>)
        });

        return(
            <div className='container'>
                <UserSearch/>
                {profilesToRender}
                {/*<button onClick={this.refreshAll}>REFRESH ALL</button>*/}
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
                    dispatch(loadUsersSuccessAction(users));
                });
        }
    }
};

ProfileList = connect(mapStateToProps, mapDispatchToProps)(ProfileList);

export default ProfileList;