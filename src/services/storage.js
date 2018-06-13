import localforage from 'localforage';
const storageKey = 'github_profiles_database';

let addUser = (profile) => {
    return localforage.setItem(storageKey, profile);
};

let getUsers = () => {
    return localforage.getItem(storageKey)
};

export { addUser, getUsers };