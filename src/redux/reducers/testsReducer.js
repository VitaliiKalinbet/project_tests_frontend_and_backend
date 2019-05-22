export default function tests (state = [], action) {
    switch (action.type) {
        case 'ALL_TESTS':
            return [...action.payload];
        default:
            return state;
    }
}