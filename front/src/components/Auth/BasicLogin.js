import React, {useState} from "react";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import BasicTextField from "../Fields/BasicTextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

function BasicLogin({onSubmit}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .min(5, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Required field'),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(1000, 'Too Long!')
            .required('Required field')
    });

    const handleSubmit = data => {
        onSubmit(data);
        handleClose();
    };

    return (
        <>
            <div>
                <span onClick={handleOpen} className='link'>Basic authorization</span>
            </div>

            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogContent>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({errors, touched}) => (
                            <Form>
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
                                        name="password"
                                        id="password"
                                        label="password"
                                    />
                                    {errors.password && touched.password ? (
                                        <div>{errors.password}</div>
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
    )
}

export default BasicLogin;
