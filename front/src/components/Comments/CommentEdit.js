import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import BasicTextField from '../Fields/BasicTextField';

function CommentEdit({comment, onSubmit}) {
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState(null);
    const initialValues = {text: ''};

    const commentSchema = Yup.object().shape({
        text: Yup.string()
            .min(5, 'Too Short!')
            .max(1000, 'Too Long!')
            .required('Required field')
    });

    const handleSubmit = data => {
        onSubmit(data);
        handleClose();
    };

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => {
        setFormValues(comment);
        setIsOpen(true);
    };

    return (
        <>
            <span onClick={handleOpen} className='link'>Edit</span>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <Typography variant="h3">Edit сomment:</Typography>
                <DialogContent>
                    <Formik
                        initialValues={formValues || initialValues}
                        validationSchema={commentSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({errors, touched}) => (
                            <Form>
                                <div>
                                    <BasicTextField
                                        name="text"
                                        id="text"
                                        label="text"
                                    />
                                    {errors.text && touched.text ? (
                                        <div>{errors.text}</div>
                                    ) : null}
                                </div>

                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CommentEdit;
