import React from 'react';
import { connect } from 'react-redux';
import {loadUserAction, loadUsersSuccessAction, searchUserAction, searchUserSuccessAction} from "../actions";
import { searchUser, getUser, getUsersRepos } from '../services/api';
import {addUser, getUsers} from '../services/storage';

class UserSearch extends React.Component {
    // constructor(props){
    //     super(props);
    //
    //     this.state = {
    //         query: '',
    //         users: []
    //     }
    // }


    // handleInput = (e) => {
    //     this.setState({
    //         query: e.target.value
    //     })
    // };
    //
    // formSubmit = () => {
    //     //czekam na odpowiedź funkcji searchUser i dopiero potem mogę zmienić state
    //     searchUser(this.state.query).then((profiles) => {
    //         this.setState({
    //             users: profiles
    //         });
    //     });
    // };

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


    render(){
        let input;

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
    return { searchedUsers: state.searchedUsers}
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
        }
    }
};


UserSearch = connect(mapStateToProps, mapDispatchToProps)(UserSearch);

export default UserSearch;
