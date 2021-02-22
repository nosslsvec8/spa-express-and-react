import React, {useState, useEffect} from 'react';
import PostsList from '../components/PostsList';
import {getPosts} from "./hooks/crud";

function PostsListContainer() {
    const [posts, setPosts] = useState([]);
    const getData = async () => {
        const {data} = await getPosts();
        setPosts(data);
    };

    useEffect(getData, []);

    return (
        <PostsList posts={posts} />
    );
}

export default PostsListContainer;
