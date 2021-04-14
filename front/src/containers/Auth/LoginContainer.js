import React, {useCallback} from 'react';
import {useMutation, useQuery} from 'react-query';
import Login from '../../components/Auth/Login';
import {loginRequest} from "../hooks/crud";

function LoginContainer() {
    const {mutate: user} = useMutation(loginRequest);
    let userData = null;
    const {data: response, refetch} = useQuery(['accessToken'], () => loginRequest(userData), {enabled: false});

    const onSubmit = useCallback(async formData => {
        try {
            userData = formData;
            await refetch(formData);
        } catch (e) {
            console.log(e);
        }
    }, [user]);

    return (
        <Login onSubmit={onSubmit}/>
    );
}

export default LoginContainer;
