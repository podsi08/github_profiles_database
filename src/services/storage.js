import localforage from 'localforage';
const storageKey = 'github_profiles_database';

let addUser = (profile) => {
    return localforage.setItem(storageKey, profile);
};

export default addUser;