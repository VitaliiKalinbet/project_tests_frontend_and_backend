export function addCurrentResult(data, index) {
    return {
        type: 'TESTISREADY',
        data,
        index,
    }
}