import React, { createContext, useReducer } from 'react';
import userReducer from './reducers/UserReducer';


export const userStore = createContext();
// define types

const UserContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, {});

    return (
        <userStore.Provider value={{ state, dispatch }}>
            {children}
        </userStore.Provider>
    );

};

export default UserContextProvider;