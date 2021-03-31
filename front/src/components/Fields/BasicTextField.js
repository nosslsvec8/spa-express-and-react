import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';

function BasicTextField(props) {
    const [field, meta, {touched, error}] = useField(props);

    return (
        <TextField
            error={!!error}
            touched={!!touched}
            {...field}
            {...meta}
            {...props}
        />
    );
}

export default BasicTextField;
