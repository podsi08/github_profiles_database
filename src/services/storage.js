import {getUser} from './api';

let addUser = (id) => {
    getUser(id).then((user) => {
        console.log(user);
    });
};

export default addUser;