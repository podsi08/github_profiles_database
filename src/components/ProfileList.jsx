import React from 'react';
import { observer, inject } from 'mobx-react';
import Profile from './Profile';
import UserSearch from './UserSearch';


@inject ('profilesStore')
@observer
class ProfileList extends React.Component {
    componentDidMount() {
        this.props.profilesStore.loadUsers()
    }

    render(){
        let profilesToRender = [];
        console.log('renderowanie ProfileList');

        //z tablicy z profilami załadowanej do state z local storage tworzę listę dodanych do bazy użytkowników
        this.props.profilesStore.profiles.map(profile => {
            profilesToRender.push(<Profile key={profile.login} profile={profile}/>)
        });

        return(
            <div className='container'>
                <UserSearch/>
                {profilesToRender}
                <button onClick={this.props.profilesStore.refreshAll}>REFRESH ALL</button>
            </div>

        )
    }
}

export default ProfileList;