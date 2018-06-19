import React from 'react';
import { observer, inject } from 'mobx-react';
import Profile from './Profile';
import UserSearch from './UserSearch';
import { getUsers, addUser } from "../services/storage";
import { getUsersRepos } from "../services/api";

@inject ('profilesStore')
@observer
class ProfileList extends React.Component {

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


    componentDidMount() {
        this.props.profilesStore.loadUsers()
    }

    render(){
        let profilesToRender = [];

        console.log('renderowanie ProfileList');
        console.log(this.props.profilesStore.profiles);

        //z tablicy z profilami załadowanej do state z local storage tworzę listę dodanych do bazy użytkowników
        this.props.profilesStore.profiles.map(profile => {
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

export default ProfileList;