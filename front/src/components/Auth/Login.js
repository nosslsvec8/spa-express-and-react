import React, {useState} from "react";
import {Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import BasicLogin from "../../containers/Auth/BasicLoginContainer";
import SocialLoginContainer from "../../containers/Auth/SocialLoginContainer";

function Login() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const handleSubmit = () => {
        handleClose();
    };

    return (
        <>
            <span title="Login" onClick={handleOpen} className='link'>sign in</span>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <DialogContent>
                    <Formik
                        initialValues={''}
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <BasicLogin/>

                            <SocialLoginContainer
                                provider='google'
                                appId={process.env.REACT_APP_AppIdGoogle}
                                buttonText='Login with google'
                            />

                            <SocialLoginContainer
                                provider='facebook'
                                appId={process.env.REACT_APP_appIdFacebook}
                                buttonText='Login with facebook'
                            />

                            <Button type="submit" variant="contained" color="primary">
                                Close
                            </Button>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Login;
