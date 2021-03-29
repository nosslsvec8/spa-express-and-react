import React, {useState} from "react";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import BasicTextField from '../Fields/BasicTextField';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";


function PostCreate({onSubmit}) {
    const [isOpen, setIsOpen] = useState(false);
    const FILE_TYPES = ['image/jpeg'];
    const [image, setImage] = useState();
    const [croppedImage, setCroppedImage] = useState();
    const [cropper, setCropper] = useState();

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
        onSubmit({...data, postPicture: croppedImage});
        handleClose();
    };

    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);

    const handleChange = e => {
        e.preventDefault();
        const file = e.target.files[0];

        if (FILE_TYPES.includes(file.type) && file.size < 10000000) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.log('ERROR!');
        }
    };

    const cropImage = () => {
        if (typeof cropper !== 'undefined') {
            setCroppedImage(cropper.getCroppedCanvas().toDataURL());
        }
    };

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
                        {() => (
                            <Form>
                                <div>
                                    <BasicTextField
                                        name="title"
                                        id="title"
                                        label="title"
                                    />
                                </div>

                                <div>
                                    <BasicTextField
                                        name="text"
                                        id="text"
                                        label="text"
                                    />
                                </div>

                                <div>
                                    {!croppedImage && <Button variant="contained" component="label">
                                        Upload Image
                                        <input accept="image/jpeg" onChange={handleChange} hidden type="file"
                                               name="postPicture" id="postPicture"/>
                                    </Button>}
                                    {image && !croppedImage &&
                                    <Cropper src={image} onInitialized={instance => setCropper(instance)}/>}
                                    {image && !croppedImage &&
                                    <Button variant="contained" onClick={cropImage}>Crop!</Button>}
                                    {croppedImage && <img src={croppedImage} alt='uploaded'/>}
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
