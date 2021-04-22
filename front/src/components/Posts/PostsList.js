import React, {useCallback, useContext} from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {CurrentUserContext} from "../../containers/RenderContainer";
import CommentsList from '../../containers/Comments/CommentsListContainer';
import ActionMenu from "../ActionMenu";
import PostEdit from "../../containers/Post/PostEditContainer";
import PostDelete from "../../containers/Post/PostDeleteContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

function PostsList({posts, isFetching, onLoadMore, countPosts}) {
    const currentUser = useContext(CurrentUserContext);
    const classes = useStyles();
    const pathImageStorage = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}\\uploads\\`;
    const getMorePosts = () => handleMorePosts();

    const handleMorePosts = useCallback(async () => {
        try {
            onLoadMore();
        } catch (e) {
            console.log(e);
        }
    }, [posts]);

    if(!currentUser) {
        return (<></>);
    }

    return (
        <Grid container spacing={5} className={classes.root}>
            {isFetching && 'Loading posts...'}
            {!isFetching &&
            posts.map(({id, userId, title, text, pictureLink}) => (
                <Grid item xs={9} key={id}>
                    <Paper className={classes.paper}>
                        {userId===currentUser.id &&
                        <ActionMenu object={{id, text, userId}} ObjectEdit={PostEdit} ObjectDelete={PostDelete}/>}
                        <CardHeader title={title}/>
                        {pictureLink &&
                        <img
                            src={`${pathImageStorage}${pictureLink}`}
                            alt='Post title'
                        />}
                        <CardContent>
                            <Typography variant="body1">{text}</Typography>
                        </CardContent>
                    </Paper>
                    <CommentsList postId={id}/>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button
                    disabled={countPosts <= posts.length}
                    onClick={getMorePosts}
                    variant="contained"
                    color="primary"
                >
                    Load more
                </Button>
            </Grid>
        </Grid>
    );
}

export default PostsList;
