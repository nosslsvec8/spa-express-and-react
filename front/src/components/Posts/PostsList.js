import React, {useCallback} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import PostEdit from "../../containers/PostEditContainer";

function PostsList({posts, isFetching, onLoadMore, countPosts}) {
    const handleMorePosts = useCallback(async () => {
        try {
            onLoadMore();
        } catch (e) {
            console.log(e);
        }
    }, [posts]);

    return (
        <List component="nav" aria-label="main mailbox folders">
            {isFetching && 'Loading posts...'}
            {!isFetching &&
            posts.map(({id, title, text}) => (
                <ListItem button key={id}>
                    <ListItemText primary={title} title={text} />
                    <Typography variant="body1">
                        <PostEdit post={{id, title, text}}/>
                    </Typography>
                </ListItem>
            ))}
            <Button
                disabled={countPosts <= posts.length}
                onClick={() => handleMorePosts()}
                variant="contained"
                color="primary"
            >
                Load more
            </Button>
        </List>
    );
}

export default PostsList;
