import React from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import BasicTextField from '../Fields/BasicTextField';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function CommentCreate({onSubmit}) {
    const commentSchema = Yup.object().shape({
        text: Yup.string()
            .min(5, 'Too Short!')
            .max(1000, 'Too Long!')
            .required('Required field')
    });

    const handleSubmit = data => {
        onSubmit(data);
    };

    return (
        <>
            <Formik
                initialValues={{text: ''}}
                validationSchema={commentSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched}) => (
                    <Grid>
                        <Paper className="tab">
                            <Form>
                                <Typography variant="h6">Create a new comment:</Typography>
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

                                <Button type="submit" variant="contained" color="primary" title="Create a new comment">
                                    Send
                                </Button>
                            </Form>
                        </Paper>
                    </Grid>
                )}
            </Formik>
        </>
    );
}

export default CommentCreate;
