export default function checkBoxStatus (state = false, action) {
    switch(action.type) {

        case 'CHECKBOX_ON':
            return true;

        case 'CHECKBOX_OFF':
            return false;

        default:
            return state;
    }
}