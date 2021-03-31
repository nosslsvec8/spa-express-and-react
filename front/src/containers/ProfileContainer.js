import React, {useCallback, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Profile from '../components/Profile';
import {getUser, updateUserRequest, getUserAvatar} from "./hooks/crud";

function ProfileContainer() {
    const [id, setId] = useState(1);
    const {data: response} = useQuery(['user', id], () => getUser(id));
    const user = response?.data || [];

    const {mutate: editUser} = useMutation(updateUserRequest);
    const onSubmit = useCallback(async formData => {
        try {
            const data = await editUser(formData);
        } catch (e) {
            console.log(e);
        }
    }, [editUser]);

    return (
        <Card>
            <CardHeader title="My Profile:"/>
            <CardContent>
                <Profile user={user} onSubmit={onSubmit}/>
            </CardContent>
        </Card>
    );
}

export default ProfileContainer;
