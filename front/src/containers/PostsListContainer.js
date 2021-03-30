import React, {useCallback, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import PostsList from '../components/Posts/PostsList';
import {getPosts, getCountPosts, createPostRequest} from "./hooks/crud";

function PostsListContainer() {
    const [limit, setLimit] = useState(10);
    const {data: response, isFetching} = useQuery(['posts', limit], () => getPosts(limit));
    const {data: count} = useQuery('countPosts', () => getCountPosts());
    const posts = response?.data || [];
    const countPosts = count?.data[0]?.count || [];

    const onLoadMore = () => {
        setLimit(limit + 10);
    };

    const {mutate: createPost} = useMutation(createPostRequest);
    const onSubmit = useCallback(async formData => {
        try {
            const data = await createPost(formData);
        } catch (e) {
            console.log(e);
        }
    }, [createPost]);

    return (
        <PostsList posts={posts} isFetching={isFetching} onLoadMore={onLoadMore} countPosts={countPosts}/>
    );
}

export default PostsListContainer;
