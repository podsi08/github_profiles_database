import React from 'react';

class Repository extends React.Component {
    render(){
        return(
            <div className='repositories_repo'>
                <div>{this.props.repoName}</div>
                <div>{this.props.stars}</div>
            </div>
        )
    }
}

export default Repository;