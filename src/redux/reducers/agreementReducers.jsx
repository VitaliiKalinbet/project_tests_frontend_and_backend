export default function showAgreement (state = false, action) {
    switch(action.type) {
        
        case 'AGREEMENT_SHOW':
            return true;

        case 'AGREEMENT_HIDE':
            return false;

        default: 
            return state;
    }
}