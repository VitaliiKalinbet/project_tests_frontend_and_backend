export const passChangeHandler = (value) => ({
    type: 'PASS_CHANGE',
    data: value
});

export const passChangeClear = () => ({
    type: 'PASS_CLEAR',
    data: ''
});