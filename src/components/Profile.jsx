import React from 'react';
import User from "./User";
import Repository from "./Repository";

class Profile extends React.Component {
//
//     refreshUserRepoClick = () => {
//         if(typeof this.props.refreshUserRepo === 'function'){
//             this.props.refreshUserRepo(this.props.profile);
//         }
//     };
//
    renderRepos = () => {
        if (this.props.profile.showRepos) {
            return (
                <div className='repositories'>
                    {
                        this.props.profile.repos.map(repo => {
                            return <Repository key={repo.name} repoName={repo.name} stars={repo.stars}/>
                        })
                    }
                    <button onClick={this.refreshUserRepoClick}>REFRESH</button>
                </div>
            )
        } else {
            return <div/>
        }
    };

    render(){
        console.log(this.props.profile.showRepos);
        return(
            <div className='profile'>
                <User login={this.props.profile.login} date={this.props.profile.date}/>
                {this.renderRepos()}
            </div>
        )
    }
}

export default Profile;