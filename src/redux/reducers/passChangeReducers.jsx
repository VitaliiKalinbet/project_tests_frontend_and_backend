export default function passChange (state='', action) {
    switch(action.type) {

        case 'PASS_CHANGE':
            return action.data;
        case 'PASS_CLEAR':
            return action.data;

        default: return state
    }
}