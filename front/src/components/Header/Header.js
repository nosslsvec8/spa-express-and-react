import {Link} from "react-router-dom";
import PostCreate from "../../containers/PostCreateContainer";
import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    return (
        <header>
            <h2>Header</h2>
            <div className="flex">
                <Typography variant="body1">
                    Logo
                </Typography>
                <Typography variant="body1" title="Add new post to the list" onClick={handleOpen}>sign up</Typography>
                <Dialog
                    open={isOpen}
                    onClose={handleClose}
                >
                    <DialogContent>
                        <form
                            action="http://localhost:3008/auth/register"
                            method="post"
                            encType="multipart/form-data"
                        >
                            Select image to upload:
                            <div>
                                Name:
                                <input type="name" name="name" id="name"/>
                            </div>
                            <div>
                                Email:
                                <input type="email" name="email" id="email"/>
                            </div>
                            <div>
                                Password:
                                <input type="password" name="password" id="password"/>
                            </div>
                            <div>
                                <input type="file" name="avatar" id="avatar"/>
                            </div>
                            <div>
                                <input type="submit" value="submit" name="submit"/>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <nav>
                <Link to={"/articles"}>Articles</Link>
                <PostCreate/>
                <Link to={"/profile"}>Profile</Link>
            </nav>
        </header>
    )
}

export default Header;
