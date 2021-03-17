import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';

function BasicTextField(props) {
    const [field, meta] = useField(props);

    return (
        <TextField
            {...field}
            {...meta}
            {...props}
        />
    );
}

export default BasicTextField;
