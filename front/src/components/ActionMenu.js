import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import "./ActionMenu.css";

function ActionMenu({object, ObjectEdit, ObjectDelete}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="ActionMenu">
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
                        <ObjectEdit object={object}/>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ObjectDelete object={object}/>
                    </MenuItem>
                </div>
            </Menu>
        </div>
    );
}

export default ActionMenu;
