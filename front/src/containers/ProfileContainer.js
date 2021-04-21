import React, {useCallback, useContext} from 'react';
import {useMutation} from 'react-query';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Profile from '../components/Profile/Profile';
import {updateUserRequest} from "./hooks/crud";
import {CurrentUserContext} from "./RenderContainer";

function ProfileContainer() {
    const currentUser = useContext(CurrentUserContext);
    const {mutate: editUser} = useMutation(updateUserRequest);

    const onSubmit = useCallback(async formData => {
        try {
            await editUser(formData);
        } catch (e) {
            console.log(e);
        }
    }, [editUser]);

    return (
        <Card>
            <CardHeader title="My Profile:"/>
            <CardContent>
                <Profile user={currentUser} onSubmit={onSubmit}/>
            </CardContent>
        </Card>
    );
}

export default ProfileContainer;
