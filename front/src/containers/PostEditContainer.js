import React, {useCallback} from 'react';
import {useLocation} from 'react-router';
import {useQuery, useMutation} from 'react-query';
import PostEdit from '../components/Posts/PostEdit';
import {getPost, updatePostRequest} from "./hooks/crud";

function PostEditContainer() {
    const regEx = /[^\d\+]/g;
    const location = useLocation();
    const id = location.pathname.replace(regEx, '');

    const {data: response, isFetching} = useQuery('post', () => getPost(+id));
    const post = response?.data || [];
    const {mutate: editPost} = useMutation(updatePostRequest);

    const onSubmit = useCallback(async formData => {
        try {
            const data = await editPost(formData);
        } catch (e) {
            console.log(e);
        }
    }, [editPost]);

    return (
        <PostEdit post={post} isFetching={isFetching} onSubmit={onSubmit}/>
    );
}

export default PostEditContainer;
