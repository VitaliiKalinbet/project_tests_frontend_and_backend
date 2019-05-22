export default function registration (state = false, action) {
    switch(action.type) {
        case 'REGISTRATION_SHOW':
            return true;
        case 'REGISTRATION_HIDE':
            return false;
        default: 
            return state 
    }
}