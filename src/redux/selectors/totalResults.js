export const total = (store) => store.dataResults;
export const massLenght = (store) => total(store).length;
export const totalResults = (store) => Math.round(total(store).reduce((acc, el) => (acc + el.corAnswers), 0)/massLenght(store));
export const percentResults = (store) => Math.round(total(store).reduce((acc, el) => (acc + parseFloat(el.success)), 0)/massLenght(store));