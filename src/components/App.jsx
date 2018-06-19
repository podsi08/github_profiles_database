import React from 'react';
import { Provider } from 'mobx-react';
import ProfileList from "./ProfileList";
import searchedUsersStore from "../store/searchedUsersStore";
import profilesStore from "../store/profilesStore";

const stores = {
    searchedUsersStore: searchedUsersStore,
    profilesStore: profilesStore
};

class App extends React.Component {
    render(){
        return(
            <Provider {...stores}>
                <ProfileList/>
            </Provider>
        )
    }
}

export default App