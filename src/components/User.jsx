import React from 'react';

class User extends React.Component {
    render() {
        return (
            <div>
                <span>{this.props.login}</span>
                <span>{this.props.date}</span>
                <button>SHOW REPOSITORIES</button>
            </div>
        )
    }
}

export default User;