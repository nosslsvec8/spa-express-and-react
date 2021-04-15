import React, {useCallback} from 'react';
import {useMutation} from 'react-query';
import PostCreate from '../../components/Posts/PostCreate';
import {createPostRequest} from "../hooks/crud";

function PostsCreateContainer() {
    const {mutate: createPost} = useMutation(createPostRequest);

    const onSubmit = useCallback(async formData => {
        try {
            await createPost(formData);
        } catch (e) {
            console.log(e);
        }
    }, [createPost]);

    return (
        <PostCreate onSubmit={onSubmit}/>
    );
}

export default PostsCreateContainer;
