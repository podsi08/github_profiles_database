import React from 'react';
import { observer, inject } from 'mobx-react';


@inject('searchedUsersStore')
@inject('profilesStore')
@observer
class UserSearch extends React.Component {
    handleInput = (event) => {
        this.props.searchedUsersStore.changeQuery(event.target.value)
    };

    render(){
        return(
            <div className='user_search'>
                <input type='text' placeholder='user name' onChange={this.handleInput}/>
                <button onClick={this.props.searchedUsersStore.searchForUsers}>FIND</button>
                {
                    this.props.searchedUsersStore.searchedUsers !== undefined && this.props.searchedUsersStore.searchedUsers.map((user) => {
                        return <div className='searched_user' key={user.id} onClick={() => this.props.profilesStore.addUserAction(user.id)}>{user.login}</div>
                    })
                }
            </div>
        )
    }
}

export default UserSearch;
