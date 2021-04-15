import React, {useState} from 'react';
import {useQuery} from 'react-query';
import PostsList from '../../components/Posts/PostsList';
import {getPosts, getCountPosts} from "../hooks/crud";

function PostsListContainer() {
    const [limit, setLimit] = useState(5);
    const {data: response, isFetching} = useQuery(['posts', limit], () => getPosts(limit));
    const {data: count} = useQuery('countPosts', () => getCountPosts());
    const posts = response?.data || [];
    const countPosts = count?.data[0]?.count || [];

    const onLoadMore = () => {
        setLimit(limit + 5);
    };

    return (
        <PostsList posts={posts} isFetching={isFetching} onLoadMore={onLoadMore} countPosts={countPosts}/>
    );
}

export default PostsListContainer;
