export default function modules (state = [], action) {
    switch (action.type) {
        case 'ALL_MODULES':
            return [...action.payload];
        default:
            return state;
    }
}