import React from 'react';
import {observer, inject} from 'mobx-react';

@inject ('profilesStore')
@observer
class User extends React.Component {
    render() {
        return (
            <div className='user'>
                <div>{this.props.login} </div>
                <div>{this.props.date} </div>
                <button onClick={() => this.props.profilesStore.showUserRepos(this.props.login)}>SHOW REPOSITORIES</button>
            </div>
        )
    }
}

export default User;