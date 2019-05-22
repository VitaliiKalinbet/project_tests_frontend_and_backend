import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import { compose } from 'redux'
import { withRouter } from "react-router";

import {resultIsActive, resultIsInactive} from '../../redux/actions/resultPageActions';
import {showEnter} from '../../redux/actions/enterAction';
import {showRegistration} from '../../redux/actions/registrationAction';
import {isLogout} from '../../redux/actions/isLogin';
import {unSelectedTest} from '../../redux/actions/selectedTestAction';
import {clearDataResult} from '../../redux/actions/actionDataResults';

import styles from './Header.css';
import {unsetTestIsReady} from "../../redux/actions/testIsReadyActions";
import {addCurrentAnswers} from "../../redux/actions/currentAnswerActions";

const Header = (props) => {

    const logOut = function() {
        props.logoutHandler();
        props.resultPageOff();
        props.unSelectedTestFunc();
        props.clearDataResultFunc();
    };

    const clearTestProgress = () => {
        props.unsetTestIsReadyFunc();
        props.currentAnswer.map((el, i) => addCurrentAnswers(undefined, i));
        props.unSelectedTestFunc();
    };


    return (
      <div>
          {props.checkLogin
            ?
            <div className={styles.header__container}>
                <div className={styles['header__main-nav-link']} onClick={props.resultIsInactiveFunc}>
                    { props.location.pathname.includes("tests/") && <NavLink to="/tests"
                             className={styles.test}
                             onClick={clearTestProgress}
                    >Вернуться к меню</NavLink>}
                </div>
                <ul className={styles['header__menu-nav-links']}>
                    <li className={styles.header__item}>
                        <div className={styles['header__item-nav']} onClick={props.resultIsActiveFunc}>Результаты
                        </div>
                    </li>
                    <li className={styles.header__item}>
                        <NavLink to="/" className={styles['header__item-nav']} onClick={logOut}>Выйти</NavLink>
                    </li>
                </ul>
            </div>
            :
            <div className={styles.header__container2}>
                    <div className={styles['header__menu-buttons']}>
                        <button className={styles.header__button} onClick={props.showRegistration}>Регистрация</button>
                        <button className={styles['header__button'] + ' ' + styles['header__margine-right']}
                                onClick={props.showEnter}>Вход
                        </button>
                    </div>
            </div>
          }
      </div>
    )
};

function MSTP(state) {
    return {
        checkLogin: state.isLogin,
        currentAnswer: state.currentAnswer,
    }
}

function MDTP(dispatch) {
    return {
        resultPageOff: function () {
            dispatch(resultIsInactive());
        },
        logoutHandler: function() {
            dispatch(isLogout());
        },
        showEnter: function() {
            dispatch(showEnter())
        },
        showRegistration: function() {
            dispatch(showRegistration())
        },
        resultIsActiveFunc : function() {
            dispatch(resultIsActive())
        },
        resultIsInactiveFunc : function() {
            dispatch(resultIsInactive());
        },
        clearDataResultFunc : function() {
            dispatch(clearDataResult());
        },
        unsetTestIsReadyFunc: () => dispatch(unsetTestIsReady()),
        unSelectedTestFunc: ()=> dispatch(unSelectedTest()),
    }
}

export default compose(withRouter, connect(MSTP, MDTP))(Header);