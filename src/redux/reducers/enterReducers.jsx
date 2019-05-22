export default function enter (state = false, action) {
    switch(action.type) {
        case 'ENT':
            return true;
        case 'CLOSE':
            return false;
        default:
            return state;
    }
}