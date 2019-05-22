export default function resultIsActive (state = false, action) {
    switch (action.type) {
    case 'ACTIVE':
        return true;
    case 'INACTIVE':
        return false;
    default:
        return state;
}
}