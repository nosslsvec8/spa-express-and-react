import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import PostDelete from '../../components/Posts/PostDelete';
import {deletePostRequest} from "../hooks/crud";

function PostDeleteContainer({object}) {
    const {mutate: deletePost} = useMutation(deletePostRequest);

    const onSubmit = useCallback(async formData => {
        try {
            await deletePost(formData);
        } catch (e) {
            console.log(e);
        }
    }, [deletePost]);

    return (
        <PostDelete post={object} onSubmit={onSubmit}/>
    );
}

export default PostDeleteContainer;
