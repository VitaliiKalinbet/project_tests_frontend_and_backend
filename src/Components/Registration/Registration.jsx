import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Modal from '../ModalChild/ModalChild';

import {emailChangeHandler} from '../../redux/actions/emailChangeAction';
import {passChangeHandler} from '../../redux/actions/passChangeAction';
import {checkBoxOn, checkBoxOff} from '../../redux/actions/checkBoxAction';
import {hideRegistration} from '../../redux/actions/registrationAction';
import {agreementOn, agreementOff} from '../../redux/actions/agreementAction';
import {emailChangeClear} from '../../redux/actions/emailChangeAction';
import {passChangeClear} from '../../redux/actions/passChangeAction';
import {setMessageText} from '../../redux/actions/messageTextActions';

import email from './mail.svg';
import lock from './locked.svg';
import styles from './Registration.css';

const Registration = (props) => {

    const modalCloseStateClear = () => {
        props.hideRegistration();
        props.emailChangeClearFunc();
        props.passChangeClearFunc();
    };
    
    const onChangeEm = (e) => {
        props.emailChangeHandler(e.target.value)
    };

    const onChangePass = (e) => {
        props.passChangeHandler(e.target.value)
    };

    const closeRegModal = (e) => {
        e.stopPropagation();

        if (e.target.id === 'overlay' || e.target.id === 'closeSymbol') {
            props.closeAgr();
            props.checkBoxOffFunc();
            props.hideRegistration();
            modalCloseStateClear();
        }
    };

    const disactiveCheckAndShowAgr = () => {
        props.showAgr();
        props.checkBoxOffFunc();
    };

    const valPass = () => {
        let passReg = /[\w-]{6,10}$/;
        return passReg.test(props.passChange)
    };

    const valMail = () => {
        let loginReg =  /[\w-]+@([\w-]+\.)+[a-z]{2,6}$/;
        return loginReg.test(props.emailChange)
    };

    const sumCheck = () => {
        if(valPass() && valMail()) {
            const result = {
                email: props.emailChange,
                password: props.passChange
            };

            axios.post('/users', result)
                .then(result => result.status === 201
                    ? props.setMessageTextFunc(`Пользователь ${result.data.email} успешно создан.
                     Теперь вы можете осуществить вход в систему.`)
                    : null)
        .catch(err => {console.log(err); props.setMessageTextFunc('Такой пользователь уже существует!')})
        }
    };

    const submit = (e) => {
        e.preventDefault();
        sumCheck();
        props.checkBoxOffFunc();
        modalCloseStateClear();
    };
    
    return (
      <div>
          {props.showAgreement ?
            <Modal closeModal={closeRegModal}>
                <span className={styles.back} onClick={disactiveCheckAndShowAgr}>&#8249;</span>
                <h2 className={styles.regSpan}>Пользовательское соглашение</h2>
                <p className={styles.agreement}>
                    Регестрируясь на сайте, я даю согласие на обработку моих персональных данных в соответствии с ЗУ"Про
                    защиту персональных данных".
                </p>
            </Modal>
            :
            <Modal closeModal={closeRegModal}>
                <h2 className={styles.regSpan}>Регистрация</h2>
                <form className={styles.form} onSubmit={submit}>
                    <div className={styles.emCont}>
                        <img src={email} alt="e" className={styles.emSvg}/>
                        <input type='email' pattern="[\w-]+@([\w-]+\.)+[a-z]{2,6}$"
                               title='Адрес должен содержать "@" и "." и от 2 до 6 символов после точки'
                               className={styles.input} placeholder='E-mail' value={props.emailChange}
                               onChange={onChangeEm}/>
                    </div>
                    <div className={styles.lockCont}>
                        <img src={lock} alt="lock" className={styles.lockSvg}/>
                        <input type="password" pattern="[\w-]{6,10}$" title='Введите пароль от 6 до 10 символов'
                               className={styles.input} placeholder='Password' value={props.passChange}
                               onChange={onChangePass}/>
                    </div>
                    <p className={styles.agreement}>
                        <label htmlFor="1">
                            <input type="checkbox" id='1' className={styles.styleCheckbox}
                                   onClick={props.checkBoxStatus ? props.checkBoxOffFunc : props.checkBoxOnFunc}/>
                        </label>
                        Регистрируясь, вы принимаете <span className={styles.orangeSp} onClick={props.showAgr}>пользовательское соглашение</span>
                    </p>
                    {props.checkBoxStatus &&
                    <button type='submit' className={styles.btn}>Зарегистрироваться</button>
                    }
                </form>
            </Modal>
          }
      </div>
    )
};

function MSTP (state) {
    return {
        emailChange: state.emailChange,
        passChange: state.passChange,
        checkBoxStatus: state.checkBoxStatus,
        showAgreement: state.showAgreement,
        messageText: state.messageText
    }
}

function MDTP (dispatch) {
    return {
        emailChangeHandler: function(value) {
            dispatch(emailChangeHandler(value))
        },
        passChangeHandler: function(value) {
            dispatch(passChangeHandler(value))
        },
        checkBoxOnFunc: function() {
            dispatch(checkBoxOn())
        },
        checkBoxOffFunc: function() {
            dispatch(checkBoxOff())
        },
        showAgr: function() {
            dispatch(agreementOn())
        },
        closeAgr: function() {
            dispatch(agreementOff())
        },
        hideRegistration: function () {
            dispatch(hideRegistration())
        },
        emailChangeClearFunc: function () {
            dispatch(emailChangeClear())
        },
        passChangeClearFunc: function () {
            dispatch(passChangeClear())
        },
        setMessageTextFunc: function(message) {
            dispatch(setMessageText(message))
        }
    }
}

export default connect(MSTP, MDTP) (Registration);