import React from 'react';
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";

function PostsList({post, isFetching}) {
    return (
        <List component="nav" aria-label="main mailbox folders">
            {isFetching && 'Loading posts...'}
            {!isFetching &&
            post.map(({id, title, text}) => (
                <div key={id}>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="body1">{text}</Typography>
                </div>
            ))}
        </List>
    );
}

export default PostsList;
