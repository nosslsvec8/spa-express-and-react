import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import PostEdit from '../../components/Posts/PostEdit';
import {updatePostRequest} from "../hooks/crud";

function PostEditContainer({object}) {
    const {mutate: editPost} = useMutation(updatePostRequest);

    const onSubmit = useCallback(async formData => {
        try {
            await editPost(formData);
        } catch (e) {
            console.log(e);
        }
    }, [editPost]);

    return (
        <PostEdit post={object} onSubmit={onSubmit}/>
    );
}

export default PostEditContainer;
