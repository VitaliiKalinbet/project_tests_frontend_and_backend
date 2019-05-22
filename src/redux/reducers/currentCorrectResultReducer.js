export default function correctResult(state = [], action) {
    switch (action.type) {
        case 'CORRECTRESULTISREADY':
            return action.data;
        default:
            return state;
    }
}