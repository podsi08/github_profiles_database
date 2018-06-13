import React from 'react';
import { searchUser, getUser, getUsersRepos } from '../services/api';
import addUser from '../services/storage';


class UserSearch extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            query: '',
            users: []
        }
    }

    handleInput = (e) => {
        this.setState({
            query: e.target.value
        })
    };

    formSubmit = () => {
        //czekam na odpowiedź funkcji searchUser i dopiero potem mogę zmienić state
        searchUser(this.state.query).then((profiles) => {
            this.setState({
                users: profiles
            });
        });
    };

    addUserToDatabase = (id) => {
        let profile = {};

        //pobieram dane o użytkowniku, kiedy je otrzymam, pobieram dane o repozytoriach,
        //zapisuję dane do obiektu profile, który na koniec dodam do local storage
        return getUser(id).then((user) => {
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
            console.log(profile);
            return profile;
        }).then(profile => {
            addUser(profile)
        })
    };

    render(){
        return(
            <div>
                <input type='text' placeholder='user name' onChange={this.handleInput}/>
                <button onClick={this.formSubmit}>FIND</button>
                {
                    this.state.users.map((user) => {
                        return <div key={user.id} onClick={() => this.addUserToDatabase(user.id)}>{user.login}</div>
                    })
                }
            </div>
        )
    }
}

export default UserSearch;
