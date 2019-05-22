import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Result from "../../Components/Result/Result";
import TestCard from "../TestCard/TestCard";
import MessageBox from "../MessageBox/MessageBox";

import {
  setTestIsReady,
  unsetTestIsReady
} from "../../redux/actions/testIsReadyActions";
import { dataResult } from "../../redux/actions/actionDataResults";
import { getUserAuthHeader, getUserId } from "../../helpers/userValidation";
import { addCurrentAnswers } from "../../redux/actions/currentAnswerActions";
import { unSelectedTest } from "../../redux/actions/selectedTestAction";
import {
  clearMessageText,
  setMessageText
} from "../../redux/actions/messageTextActions";
import { addCurrentCorrectResult } from "../../redux/actions/currentCorrectResultActions";
import { fetchModulesDataAsync } from "../../redux/actions/modulesAction";
import { fetchAllTestsDataAsync } from "../../redux/actions/testsAction";

import styles from "./Test.css";

const Test = ({
  selectedTest,
  unSelectedTestFunc,
  testIsReady,
  setTestIsReadyFunc,
  unsetTestIsReadyFunc,
  currentAnswer,
  currentResult,
  dataResult,
  usersRateLength,
  dataResults,
  messageText,
  setMessageTextFunc,
  clearMessageTextFunc
}) => {
  let personalResult = {};

  const saveUserTestResultToServer = persRes => {
    axios
      .put(
        `/api/users/${getUserId()}`,
        {
          results: [
            ...dataResults.filter(el => el.testid !== persRes.testid),
            persRes
          ]
        },
        getUserAuthHeader()
      )
      .then(user => dataResult(user.data.results))
      .catch(err => console.log(err));
  };

  const clearTestProgress = () => {
    unsetTestIsReadyFunc();
    currentAnswer.map((el, i) => addCurrentAnswers(undefined, i));
    unSelectedTestFunc();
  };

  const onTestIsReady = () => {
    const testResult = currentResult.filter(el => el === true).length;
    personalResult = {
      testid: selectedTest._id,
      title: selectedTest.testname,
      totalQuest: 10,
      corAnswers: testResult,
      success: (testResult / 10) * 100 + "%"
    };

    setTestIsReadyFunc();
    saveUserTestResultToServer(personalResult);
    clearMessageTextFunc();
  };

  const checkAnswers = () => {
    currentAnswer.includes(undefined) || currentAnswer.length !== 10
      ? setMessageTextFunc("Вы не ответили на все вопросы!")
      : onTestIsReady();
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className={styles.test__wrapper}>
        <div className={styles.test__container}>
          <header>
            <h1 className={styles.test__module}>{selectedTest.module}</h1>
            <h2 className={styles.test__testname}>{selectedTest.testname}</h2>
          </header>
          <div className={styles.test__content}>
            {testIsReady && <Result />}
            <div className={styles.test__cards}>
              {selectedTest.questions.map((q, index) => {
                return (
                  <TestCard
                    clas={
                      testIsReady
                        ? currentResult[index]
                          ? "correct"
                          : "wrong"
                        : "default"
                    }
                    testname={selectedTest.testname}
                    index={index}
                    question={q.question}
                    answers={q.answers}
                    key={`${selectedTest.testname}${index}`}
                  />
                );
              })}
            </div>
          </div>
          {!testIsReady && (
            <div className={styles.test__buttons}>
              <NavLink
                to="/tests"
                className={styles.test__btn}
                onClick={clearTestProgress}
              >
                ОТМЕНА
              </NavLink>
              <button className={styles.test__btn} onClick={checkAnswers}>
                ГОТОВО
              </button>
            </div>
          )}
          {messageText && <MessageBox />}
        </div>
      </div>
    </div>
  );
};

function MSTP(state) {
  return {
    allTests: state.tests,
    selectedTest: state.selectedTest,
    testIsReady: state.testIsReady,
    currentAnswer: state.currentAnswer,
    currentResult: state.currentResult,
    dataResults: state.dataResults,
    messageText: state.messageText
  };
}

function MDTP(dispatch) {
  return {
    loadModulesDataAsync: () => dispatch(fetchModulesDataAsync()),
    loadAllTestsDataAsync: () => dispatch(fetchAllTestsDataAsync()),
    dataResultFunc: data => dispatch(dataResult(data)),
    setTestIsReadyFunc: () => dispatch(setTestIsReady()),
    unsetTestIsReadyFunc: () => dispatch(unsetTestIsReady()),
    dataResult: data => dispatch(dataResult(data)),
    addCurrentAnswers: (data, index) =>
      dispatch(addCurrentAnswers(data, index)),
    addCurrentCorrectResult: data => dispatch(addCurrentCorrectResult(data)),
    unSelectedTestFunc: () => dispatch(unSelectedTest()),
    setMessageTextFunc: message => dispatch(setMessageText(message)),
    clearMessageTextFunc: () => dispatch(clearMessageText())
  };
}

export default connect(
  MSTP,
  MDTP
)(Test);
