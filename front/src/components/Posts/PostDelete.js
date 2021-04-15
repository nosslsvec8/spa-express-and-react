import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

function PostDelete({post, onSubmit}) {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const initialValues = {title: '', text: ''};

    const handleSubmit = () => {
        onSubmit({id: post.id});
        handleClose();
    };

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => {
        setFormValues(post);
        setIsOpen(true);
    };

    return (
        <>
            <span title={`Delete ${post.id} post`} onClick={handleOpen} className='link'>Delete</span>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <Typography variant="h3">Delete Form:</Typography>
                <DialogContent>
                    <Formik
                        initialValues={formValues || initialValues}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        <Form>
                            <p>Are you sure you want to delete the post?</p>
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

export default PostDelete;
