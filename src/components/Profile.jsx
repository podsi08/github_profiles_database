import React from 'react';
import User from "./User";

class Profile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showRepo: false
        }
    }
    
    renderRepos = () => {
        if (this.state.showRepo) {
            return (
                <div>

                    <button>REFRESH</button>
                </div>
            )
        }
    };

    render(){
        return(
            <div>
                <User login={this.props.login} date={this.props.date}/>
                {this.renderRepos()}
            </div>
        )
    }
}

export default Profile;