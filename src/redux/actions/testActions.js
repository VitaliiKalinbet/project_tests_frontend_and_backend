export const setSelectedTest = function (selectedTestObj) {
    return {
        type: 'SELECTED_TEST',
        payload: selectedTestObj
    }
};

export const unSelectedTest = function () {
    return {
        type: 'UNSELECTED_TEST',
        payload: {}
    }
};