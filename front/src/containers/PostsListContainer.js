import React, {useCallback, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PostsList from '../components/Posts/PostsList';
import {getPosts, getCountPosts, createPostRequest} from "./hooks/crud";

function PostsListContainer() {
    const [limit, setLimit] = useState(5);
    const {data: response, isFetching} = useQuery(['posts', limit], () => getPosts(limit));
    const {data: count} = useQuery('countPosts', () => getCountPosts());
    const posts = response?.data || [];
    const countPosts = count?.data[0]?.count || [];

    const onLoadMore = () => {
        setLimit(limit + 5);
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
        <Card>
            <CardHeader title="List of posts:"/>
            <CardContent>
                <PostsList posts={posts} isFetching={isFetching} onLoadMore={onLoadMore} countPosts={countPosts}/>
            </CardContent>
        </Card>
    );
}

export default PostsListContainer;
