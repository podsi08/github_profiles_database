import React from 'react';
import { searchUser } from '../services/api';
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

    render(){
        return(
            <div>
                <input type='text' placeholder='user name' onChange={this.handleInput}/>
                <button onClick={this.formSubmit}>FIND</button>
                {
                    this.state.users.map((user) => {
                        return <div key={user.id} onClick={() => addUser(user.id)}>{user.login}</div>
                    })
                }
            </div>
        )
    }
}

export default UserSearch;