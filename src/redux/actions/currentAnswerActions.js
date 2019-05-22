export function addCurrentAnswers(data, index) {
    return {
        type: 'ANSWERSAREREADY',
        data,
        index,
    }
}