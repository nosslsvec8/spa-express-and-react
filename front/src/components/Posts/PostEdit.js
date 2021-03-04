import React, {useState} from 'react';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';

function PostEdit({post, isFetching, onSubmit}) {
    const [formValues, setFormValues] = useState(null);
    const initialValues = {title: '', text: ''};
    let saveValues = {title: post[0]?.title, text: post[0]?.text};

    if(post.length !== 0 && formValues === null) {
        setFormValues(saveValues);
    }

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
            <h3>Post Edit Form</h3>
            {isFetching && 'Loading post...'}
            {!isFetching &&
            <Formik
                initialValues={formValues || initialValues}
                validationSchema={postSchema}
                onSubmit={handleSubmit}
                enableReinitialize
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
            }
        </div>
    );
}

export default PostEdit;
