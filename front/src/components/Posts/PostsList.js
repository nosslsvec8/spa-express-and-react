import React, {useCallback} from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import PostEdit from "../../containers/PostEditContainer";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        marginTop: '30px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

function PostsList({posts, isFetching, onLoadMore, countPosts}) {
    const classes = useStyles();
    const pathImageStorage = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}\\uploads\\`;

    const handleMorePosts = useCallback(async () => {
        try {
            onLoadMore();
        } catch (e) {
            console.log(e);
        }
    }, [posts]);

    return (
        <Grid container spacing={5} className={classes.root}>
            {isFetching && 'Loading posts...'}
            {!isFetching &&
            posts.map(({id, title, text, pictureLink}) => (
                <Grid item xs={9} key={id}>
                    <Paper className={classes.paper}>
                        <CardHeader title={title}/>
                        {pictureLink &&
                        <img
                            src={`${pathImageStorage}${pictureLink}`}
                            alt='Post title'
                        />}
                        <CardContent>
                            <Typography variant="body1">{text}</Typography>
                        </CardContent>
                        <PostEdit post={{id, title, text}}/>
                    </Paper>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Button
                    disabled={countPosts <= posts.length}
                    onClick={() => handleMorePosts()}
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
