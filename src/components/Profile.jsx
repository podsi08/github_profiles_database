import React from 'react';
import User from "./User";
import Repository from "./Repository";

class Profile extends React.Component {
    // constructor(props){
    //     super(props);
    //
    //     this.state = {
    //         showRepo: false
    //     }
    // }
    //
    // showRepos = () => {
    //     this.setState({
    //         showRepo: !this.state.showRepo
    //     })
    // };
    //
    // refreshUserRepoClick = () => {
    //     if(typeof this.props.refreshUserRepo === 'function'){
    //         this.props.refreshUserRepo(this.props.profile);
    //     }
    // };

    // renderRepos = () => {
    //     if (this.state.showRepo) {
    //         return (
    //             <div className='repositories'>
    //                 {
    //                     this.props.profile.repos.map(repo => {
    //                         return <Repository key={repo.name} repoName={repo.name} stars={repo.stars}/>
    //                     })
    //                 }
    //                 <button onClick={this.refreshUserRepoClick}>REFRESH</button>
    //             </div>
    //         )
    //     } else {
    //         return <div/>
    //     }
    // };

    render(){
        return(
            <div className='profile'>
                <User login={this.props.profile.login} date={this.props.profile.date} showRepo={this.showRepos}/>
                {/*{this.renderRepos()}*/}
            </div>
        )
    }
}

export default Profile;