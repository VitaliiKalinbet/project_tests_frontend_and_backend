import axios from 'axios';

export function fetchModulesData(data) {
    return {
        type: 'ALL_MODULES',
        payload: data,
    }
}

function fetchModules() {
    return axios.get('http://localhost:3001/modules')
        .then(result => result.status === 200 ? result.data : null)
        // .then(data => {console.log(data); return data})
        .catch(err => console.log(err))
}

export const fetchModulesDataAsync = () => dispatch => {
    fetchModules()
        .then(modules => dispatch(fetchModulesData(modules)))
        .catch(err => console.log(err))
};



