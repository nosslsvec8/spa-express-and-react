import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import BasicLogin from '../../components/Auth/BasicLogin';
import {loginRequest} from "../hooks/crud";

function BasicLoginContainer() {
    const {mutate: user} = useMutation(loginRequest);

    const onSubmit = useCallback(async formData => {
        try {
            await user(formData);
        } catch (e) {
            console.log(e);
        }
    }, [user]);

    return (
        <BasicLogin onSubmit={onSubmit}/>
    );
}

export default BasicLoginContainer;
