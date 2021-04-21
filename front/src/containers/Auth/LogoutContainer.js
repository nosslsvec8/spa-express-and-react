import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import Logout from '../../components/Auth/Logout';
import {LogoutRequest} from "../hooks/crud";

function LogoutContainer() {
    const {mutate: logout} = useMutation(LogoutRequest);

    const onSubmit = useCallback(async () => {
        try {
            await logout();
        } catch (e) {
            console.log(e);
        }
    }, [logout]);

    return (
        <Logout onSubmit={onSubmit}/>
    );
}

export default LogoutContainer;
