export const emailChangeHandler = (value) => ({
    type: 'EMAIL_CHANGE',
    data: value
});

export const emailChangeClear = () => ({
    type: 'EMAIL_CLEAR',
    data: '',
});