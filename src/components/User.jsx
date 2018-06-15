import React from 'react';

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
                {/*<button onClick={this.showRepoClick}>SHOW REPOSITORIES</button>*/}
            </div>
        )
    }
}

export default User;