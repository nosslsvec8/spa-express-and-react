module.exports =  function checkEmptyValue(value, ErrorText) {
    return (value) ? 1 : res.status(400).send(ErrorText);
};
