import React, {createContext} from 'react';
import Render from '../components/Render';
import {getByTokenUser} from "./hooks/crud";
import {useQuery} from "react-query";

export const CurrentUserContext = createContext({});

function RenderContainer() {
    const accessToken = localStorage.getItem('accessToken');
    const {data: response} = useQuery(['currentUser'], () => getByTokenUser({accessToken}));
    const currentUser = response?.data || false;

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Render/>
        </CurrentUserContext.Provider>
    );
}

export default RenderContainer;
