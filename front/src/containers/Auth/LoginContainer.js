import React, {useCallback} from 'react';
import {useMutation, useQuery} from 'react-query';
import Login from '../../components/Auth/Login';
import {loginRequest} from "../hooks/crud";

function LoginContainer() {
    const {mutate: user} = useMutation(loginRequest);
    let userData = null;

    const onSubmit = useCallback(async formData => {
        try {
            userData = formData;
            await user(formData);
        } catch (e) {
            console.log(e);
        }
    }, [user]);

    return (
        <Login onSubmit={onSubmit}/>
    );
}

export default LoginContainer;
