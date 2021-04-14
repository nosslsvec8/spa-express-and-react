import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";


function Register() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    return (
        <>
            <span title="Register" onClick={handleOpen} className='link'>sign up</span>
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
                        New user registration:
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
        </>
    )
}

export default Register;
