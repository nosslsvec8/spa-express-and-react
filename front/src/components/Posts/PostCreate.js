import React from 'react';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';

function PostCreate({onSubmit}) {
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
    };

    return (
        <div>
            <h3>Post Creation Form</h3>
            <Formik
                initialValues={{title: '', text: ''}}
                validationSchema={postSchema}
                onSubmit={handleSubmit}
            >
                {({errors, touched}) => (
                    <Form>
                        <div>
                            <label htmlFor="title">Post title</label>
                            <Field id="title" name="title" placeholder="Enter your post title..." />
                            {errors.title && touched.title ? (
                                <div>{errors.title}</div>
                            ) : null}
                        </div>

                        <div>
                            <label htmlFor="text">Post content</label>
                            <Field id="text" as="textarea" name="text" placeholder="Enter post content" />
                            {errors.text && touched.text ? (
                                <div>{errors.text}</div>
                            ) : null}
                        </div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PostCreate;
