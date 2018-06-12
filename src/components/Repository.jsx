import React from 'react';

class Repository extends React.Component {
    render(){
        return(
            <div>
                <span>{this.props.repoName}</span>
                <span>{this.props.stars}</span>
            </div>
        )
    }
}

export default Repository;