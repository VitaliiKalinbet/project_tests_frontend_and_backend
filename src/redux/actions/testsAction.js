import axios from "axios";

export function fetchAllTestsData(data) {
  return {
    type: "ALL_TESTS",
    payload: data
  };
}

function fetchAllTests() {
  return (
    axios
      .get("https://student-tests.goit.co.ua/api/tests")
      .then(result => result.status === 200 && result.data)
      // .then(data => {console.log(data); return data})
      .catch(err => console.log(err))
  );
}

export const fetchAllTestsDataAsync = () => dispatch => {
  fetchAllTests()
    .then(tests => dispatch(fetchAllTestsData(tests)))
    .catch(err => console.log(err));
};
