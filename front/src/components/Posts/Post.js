import React from 'react';
import Typography from "@material-ui/core/Typography";
import PostEdit from "../../containers/PostEditContainer";
import Grid from "@material-ui/core/Grid";
import "./Post.css";

function PostsList({post, isFetching}) {
    return (
        <Grid container spacing={5} class="Post">
            <Grid item xs={9}>User name (author)</Grid>
            <Grid item xs={3}>
                {!isFetching &&
                post.map(({id, title, text}) => (
                    <PostEdit post={{id, title, text}}/>
                ))}
            </Grid>
            {isFetching && 'Loading posts...'}
            {!isFetching &&
            post.map(({id, title, text, pictureLink}) => (
                <Grid key={id} xs={12} container>
                    <Grid item xs={8}>
                        <Typography variant="h4">{title}</Typography>
                        <Typography variant="body1">{text}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        {pictureLink &&
                        <img src={`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}\\uploads\\${pictureLink}`}/>}
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
}

export default PostsList;
