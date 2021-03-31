import * as Yup from "yup";
import {Form, Formik} from "formik";
import BasicTextField from "./Fields/BasicTextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import Grid from '@material-ui/core/Grid';

function Profile({user, onSubmit}) {
    const [formValues, setFormValues] = useState(null);
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        university: ''
    };

    if (user.length !== 0 && formValues === null) {
        setFormValues({
            name: user[0].name,
            email: user[0].email,
            phone: user[0].phone,
            university: user[0].university,
            avatarLink: `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/uploads/${user[0].avatarLink}`
        });
    }

    const userSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Required field'),
        email: Yup.string()
            .min(5, 'Too Short!')
            .max(1000, 'Too Long!')
            .required('Required field'),
        phone: Yup.string()
            .min(5, 'Too Short!')
            .max(1000, 'Too Long!')
            .required('Required field'),
        university: Yup.string()
            .min(5, 'Too Short!')
            .max(1000, 'Too Long!')
            .required('Required field'),
    });

    const handleSubmit = data => {
        onSubmit(data);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Formik
                    initialValues={formValues || initialValues}
                    validationSchema={userSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({errors, touched, values, handleChange}) => (
                        <Form>
                            <div>
                                <BasicTextField
                                    name="name"
                                    id="name"
                                    label="name"
                                />
                                {errors.name && touched.name ? (
                                    <div>{errors.name}</div>
                                ) : null}
                            </div>
                            <div>
                                <BasicTextField
                                    name="email"
                                    id="email"
                                    label="email"
                                />
                                {errors.email && touched.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                            </div>
                            <div>
                                <BasicTextField
                                    name="phone"
                                    id="phone"
                                    label="phone"
                                />
                                {errors.phone && touched.phone ? (
                                    <div>{errors.phone}</div>
                                ) : null}
                            </div>
                            <div>
                                <BasicTextField
                                    name="university"
                                    id="university"
                                    label="university"
                                />
                                {errors.university && touched.university ? (
                                    <div>{errors.university}</div>
                                ) : null}
                            </div>

                            <Grid justify="flex-start" container>
                                <Button type="submit" variant="contained" color="primary">
                                    Save
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
            <Grid item xs={6}>
                <div>
                    <img src={formValues?.avatarLink} alt="avatar"/>
                </div>
            </Grid>
        </Grid>
    )
}

export default Profile;
