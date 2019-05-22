// import axios from 'axios';

export function addCurrentCorrectResult(data) {
    return {
        type: 'CORRECTRESULTISREADY',
        data,
    }
}

// function correctResults() {
//     return axios.get('/tests')
//         .then(({data,status})=>{if(status === 200){return data}})
//         .catch(error => console.log('Getting data from server error: ' + error));
// }
//
// export const correctResultsAsync = () => dispatch => {
//     correctResults()
//         .then(result => dispatch(addCurrentCorrectResult(result[0].HTML_CSS.mediaRequests.map(el => el.rightAnswer))));
// }
// {
//     correctResults()
//     .then(result => dispatch(addCurrentCorrectResult(result)));
// }
