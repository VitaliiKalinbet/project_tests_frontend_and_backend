export default function messageText (state = '', action) {
    switch(action.type) {

        case 'CLEAR_MESSAGE_TEXT':
            return '';

        case 'SET_MESSAGE_TEXT':
            return action.payload;

        default:
            return state;
    }
}

