export default function emailChange (state='', action) {
    switch(action.type) {
        
        case 'EMAIL_CHANGE':
            return action.data;

            case 'EMAIL_CLEAR':
            return action.data;

        default: return state
    }
}