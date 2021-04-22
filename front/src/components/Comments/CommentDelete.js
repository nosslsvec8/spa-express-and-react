import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

function CommentDelete({onSubmit}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = () => {
        onSubmit();
        handleClose();
    };

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <span onClick={handleOpen} className='link'>Delete</span>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <Typography variant="h3">Delete comment:</Typography>
                <DialogContent>
                    <Formik
                        initialValues={''}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        <Form>
                            <p>Are you sure you want to delete the comment?</p>
                            <p>This action cannot be undone.</p>

                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CommentDelete;
