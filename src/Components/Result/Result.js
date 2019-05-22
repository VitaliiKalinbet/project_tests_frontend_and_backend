import React from 'react';
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';

import {unsetTestIsReady} from '../../redux/actions/testIsReadyActions';
import {addCurrentAnswers} from '../../redux/actions/currentAnswerActions';
import {setSelectedTest} from '../../redux/actions/selectedTestAction';

import styles from './Result.css';

function Result(props) {

    const offTestIsReady = () => {
        props.unsetTestIsReadyFunc();
        props.currentAnswer.map((el, i) => props.addCurrentAnswers(undefined, i));
        props.setSelectedTest();

    };

    const testResult = props.currentResult.filter(el => el === true).length;
    return (
        <div className={styles.result__container}>
            <div className={styles.result__content}>
                <h2 className={styles.result__header}>Результат:</h2>
                <ul className={styles.result__list}>
                    <li className={styles.result__item}>Вопросов: 10</li>
                    <li className={styles.result__item}>{`Правильных: ${testResult}`}</li>
                    <li className={styles.result__item}>{`Успех: ${testResult}0%`}</li>
                </ul>
            </div>
            <NavLink to="/tests" onClick={offTestIsReady} className={styles.result__btn}>Выйти</NavLink>
        </div>
    );
}

function MSTP(state) {
    return {
        currentAnswer: state.currentAnswer,
        currentResult: state.currentResult
    }
}

function MDTP(dispatch) {
    return {
        unsetTestIsReadyFunc: function () {
            dispatch(unsetTestIsReady())
        },
        addCurrentAnswers: function (data, index) {
            dispatch(addCurrentAnswers(data, index))
        },
        setSelectedTest: function() {
            dispatch(setSelectedTest(null))
        },
    }
}

export default connect (MSTP, MDTP)(Result);
