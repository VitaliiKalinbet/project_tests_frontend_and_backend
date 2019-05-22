export const clearMessageText = () => ({
    type: 'CLEAR_MESSAGE_TEXT',
});

export const setMessageText = (data) => ({
    type: 'SET_MESSAGE_TEXT',
    payload: data
});
