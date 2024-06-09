import React, { Children } from 'react';
import { debounce } from 'lodash';

export type LocalStorageType = {
    getObjects?: () => [],
    setObjects?: (objects: []) => void,
};

let objectsCache = [];

const getObjects = () => {
    if (objectsCache && objectsCache.length > 0) {
        return objectsCache;
    }
    const storageData = localStorage.getItem('objects');
    return storageData ? JSON.parse(storageData) : [];
};

const writeObjectsToLocalStorage = debounce(
    (objects) => localStorage.setItem('objects', JSON.stringify(objects)), 5000);

const setObjects = (objects: []) => {
    objectsCache = objects;
    writeObjectsToLocalStorage(objects);
};

const LocalStorageContext = React.createContext<LocalStorageType>({});
const LocalStorageProvider = ({ children }) => {
    return (
        <LocalStorageContext.Provider value={{ getObjects, setObjects }}> {children} </LocalStorageContext.Provider>);
};

export { LocalStorageContext, LocalStorageProvider };
