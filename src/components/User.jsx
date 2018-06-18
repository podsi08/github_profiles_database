import React from 'react';
import { connect } from 'react-redux';
import { showUserRepoAction } from "../actions";

class User extends React.Component {
    // showRepoClick = () => {
    //     if(typeof this.props.showRepo === 'function'){
    //         this.props.showRepo();
    //     }
    // };

    render() {
        return (
            <div className='user'>
                <div>{this.props.login} </div>
                <div>{this.props.date} </div>
                <button onClick={() => this.props.show(this.props.login)}>SHOW REPOSITORIES</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        show: user => {
            return dispatch(showUserRepoAction(user))
        }
    }
};

User = connect(null, mapDispatchToProps)(User);

export default User;