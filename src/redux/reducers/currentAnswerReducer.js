export default function currentAnswer(state = [], action) {
    switch (action.type) {
        case ('ANSWERSAREREADY'):
            state[action.index] = action.data;
            return state;
        default:
            return state;
    }
}