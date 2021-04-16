import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

function Logout({onSubmit}) {
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
            <span title={'Logout'} onClick={handleOpen} className='link'>Logout</span>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <Typography variant="h3">Logout:</Typography>
                <DialogContent>
                    <Formik
                        initialValues={''}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        <Form>
                            <p>Do you really want to leave?</p>
                            <p>We will be waiting for you.</p>

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

export default Logout;
