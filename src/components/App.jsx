import React from 'react';
import { Provider } from 'mobx-react';
import ProfileList from "./ProfileList";
import searchedUsersStore from "../store/searchedUsersStore";
import UserSearch from "./UserSearch";


class App extends React.Component {
    render(){
        return(
            <Provider store={ searchedUsersStore }>
                <UserSearch/>
            </Provider>
        )
    }
}

export default App