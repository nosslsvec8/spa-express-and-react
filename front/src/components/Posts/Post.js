import React from 'react';
import Typography from "@material-ui/core/Typography";
import PostEdit from "../../containers/PostEditContainer";
import Grid from "@material-ui/core/Grid";

function PostsList({post, isFetching}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={9}>User name (author)</Grid>
            <Grid item xs={3}>
                {!isFetching &&
                post.map(({id, title, text}) => (
                    <PostEdit post={{id, title, text}}/>
                ))}
            </Grid>
            {isFetching && 'Loading posts...'}
            {!isFetching &&
            post.map(({id, title, text}) => (
                <div key={id}>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="body1">{text}</Typography>
                </div>
            ))}
        </Grid>
    );
}

export default PostsList;
