import { combineReducers } from 'redux';
import dataResults from './reducerDataResults';

import registration from './registrationReducers';
import enter from './enterReducers';
import emailChange from './emailChangeReducers';
import passChange from './passChangeReducers';
import checkBoxStatus from './checkBoxReducers';
import isLogin from './isLogin';
import showAgreement from './agreementReducers'
import currentAnswer from './currentAnswerReducer';
import currentResult from './currentResultReducer';
import correctResult from './currentCorrectResultReducer';
import testIsReady from './testIsReadyReducer';
import tests from './testsReducer';
import selectedTest from './selectedTestReducer';
import resultIsActive from './resultPageReducer';
import modules from './modulesReducer';
import messageText from './messageTextReducers';


 export default () => combineReducers({
    currentAnswer,
    currentResult,
    correctResult,
    testIsReady,
    modules,
    tests,
    selectedTest,
    dataResults,
    registration,
    enter,
    emailChange,
    passChange,
    checkBoxStatus,
    isLogin,
    showAgreement,
    resultIsActive,
    messageText
});
