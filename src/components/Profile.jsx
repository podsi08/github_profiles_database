import React from 'react';
import User from "./User";
import Repository from "./Repository";

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showRepo: false
        }
    }

    showRepos = () => {
        this.setState({
            showRepo: !this.state.showRepo
        })
    };

    renderRepos = () => {
        if (this.state.showRepo) {
            return (
                <div className='repositories'>
                    {
                        this.props.repos.map(repo => {
                            return <Repository key={repo.name} repoName={repo.name} stars={repo.stars}/>
                        })
                    }
                    <button>REFRESH</button>
                </div>
            )
        } else {
            return <div/>
        }
    };

    render(){
        return(
            <div className='profile'>
                <User login={this.props.login} date={this.props.date} showRepo={this.showRepos}/>
                {this.renderRepos()}
            </div>
        )
    }
}

export default Profile;