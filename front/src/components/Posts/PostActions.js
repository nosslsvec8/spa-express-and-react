import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PostEdit from "../../containers/Post/PostEditContainer";
import PostDelete from "../../containers/Post/PostDeleteContainer";
import './PostAction.css';

function PostAction({post}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="postAction">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreHorizIcon/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div>
                    <MenuItem onClick={handleClose}>
                        <PostEdit post={post}/>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <PostDelete post={post}/>
                    </MenuItem>
                </div>
            </Menu>
        </div>
    );
}

export default PostAction;
