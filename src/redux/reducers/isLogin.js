
export default function isLogin (state = false, action) {
    switch (action.type){
        case 'SIGN_IN':
            return true;

        case 'SIGN_OUT':
            localStorage.removeItem('token');
            return false;

        default:
            return state;
    }
}