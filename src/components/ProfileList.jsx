import React from 'react';
import Profile from 'Profile';

class ProfileList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            profiles: []
        }
    }

    render(){
        let profilesToRender = [];
        this.state.profiles.map(profile => {
            profilesToRender.push(<Profile login={profile.login} date={profile.date}/>)
        });

        return(
            {profilesToRender}
        )
    }
}

export default ProfileList;