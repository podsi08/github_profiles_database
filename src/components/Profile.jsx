import React from 'react';
import { observer, inject } from 'mobx-react';
import User from "./User";
import Repository from "./Repository";

@inject('profilesStore')
@observer
class Profile extends React.Component {
    renderRepos = () => {
        if (this.props.profile.showRepos) {
            return (
                <div className='repositories'>
                    {
                        this.props.profile.repos.map(repo => {
                            return <Repository key={repo.name} repoName={repo.name} stars={repo.stars}/>
                        })
                    }
                    <button onClick={() => this.props.profilesStore.refreshUserRepos(this.props.profile)}>REFRESH</button>
                </div>
            )
        } else {
            return <div/>
        }
    };

    render(){
        return(
            <div className='profile'>
                <User login={this.props.profile.login} date={this.props.profile.date} showRepo={this.showRepos}/>
                {this.renderRepos()}
            </div>
        )
    }
}

export default Profile;