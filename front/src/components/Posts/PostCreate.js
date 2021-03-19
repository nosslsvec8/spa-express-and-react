import React, {useState} from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import BasicTextField from '../Fields/BasicTextField';


function PostCreate({onSubmit}) {
    const [isOpen, setIsOpen] = useState(false);

    const postSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Required field'),
        text: Yup.string()
            .min(10, 'Too Short!')
            .max(1000, 'Too Long!')
            .required('Required field')
    });

    const handleSubmit = data => {
        onSubmit(data);
        handleClose();
    };

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    return (
        <div>
            <Typography variant="body1" title="Add new post to the list" onClick={handleOpen}>Add article</Typography>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <Typography variant="h3">Post Creation Form:</Typography>
                <DialogContent>
                    <Formik
                        initialValues={{title: '', text: ''}}
                        validationSchema={postSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, values, handleChange }) => (
                            <Form>
                                <div>
                                    <BasicTextField
                                        name="title"
                                        id="title"
                                        label="title"
                                    />
                                    {errors.title && touched.title ? (
                                        <div>{errors.title}</div>
                                    ) : null}
                                </div>

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
        </div>
    );
}

export default PostCreate;
