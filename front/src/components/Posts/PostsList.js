import React, {useCallback} from 'react';
import {Link} from "react-router-dom";

function PostsList({posts, isFetching, onLoadMore, countPosts}) {
    const handleMorePosts = useCallback(async () => {
        try {
            onLoadMore();
        } catch (e) {
            console.log(e);
        }
    }, [posts]);

    return (
        <div>
            <h2>List of posts:</h2>
            {isFetching && 'Loading posts...'}
            {!isFetching &&
                posts.map(({id, title, text}) =>
                (<div key={id}>
                    <p>id: {id}, title: {title}, text: {text}</p>
                    <Link to={`/article/${id}/edit`}>edit post</Link>
                </div>))
            }
            <button
                disabled={countPosts <= posts.length}
                onClick={() => handleMorePosts()}
            >Load more</button>
        </div>
    );
}

export default PostsList;
