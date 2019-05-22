import React from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import styles from './PersonalResults.css';
import PersonalCard from './PersonalCard/PersonalCard';
import Modal from '../ModalChild/ModalChild'
import sad from './PersonalCard/images/sad.svg';
import weird from './PersonalCard/images/weird.svg';
import smile from './PersonalCard/images/smile.svg';

import {totalResults, percentResults} from '../../redux/selectors/totalResults';
import {resultIsInactive} from '../../redux/actions/resultPageActions';

const PersonalResults=({dataResult, total, percent, closeModalFunc})=> {

    const closeMsgBox = (e) => {
        if (e.target.id === 'overlay' || e.target.id === 'closeSymbol') {
            closeModalFunc();
        }
    };
        return (
            <Modal closeModal={closeMsgBox}>
            <div className={styles.wrapper}>
                <table className={styles.container} cellSpacing="0">
                <tbody>
                <tr>
                    <td colSpan="3" className={styles.resultText}>Результаты тестов</td>
                </tr>
                        <tr >
                           <th className={styles.robotoOrange}>Название</th>
                            <th className={styles.robotoOrange}>Количество правильних ответов</th>
                            <th className={styles.robotoOrange}>Процент успешности</th>
                        </tr>
                        {dataResult.map((el, index) => <PersonalCard name={el.title} result={el.corAnswers} ratio={el.success} key={index} testid={el.testid}/>)}
                        <tr>
                            <th>Итог</th>
                            <th className={styles.robotoOrange}>Средний : {total}</th>
                            <th className={styles.robotoOrange}>
                            {percent <= 50 ? 
                                            <div className={styles.flex}>
                                              <span className={styles.red}>{percent}% </span>
                                              <img src={sad} alt="sad" className={styles.svg}/>
                                            </div>
                                           :
                                            percent > 50 && percent <= 70 ?
                                                                           <div className={styles.flex}>
                                                                             <span className={styles.yellow}>{percent}% </span>
                                                                             <img src={weird} alt="weird" className={styles.svg}/>
                                                                           </div>
                                                                           :
                                                                           percent >= 80 ?
                                                                                         <div className={styles.flex}>
                                                                                             <span className={styles.green}>{percent}% </span>
                                                                                             <img src={smile} alt="smile" className={styles.svg}/>
                                                                                         </div>
                                                                                          :
                                                                                          percent }
                            </th>
                        </tr>
                        </tbody>
                </table>
            <style>@import url('https://fonts.googleapis.com/css?family=Roboto:300');</style>
            </div>
            </Modal>
        );
};

PersonalResults.propTypes = {
    total: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
};

function mSTP (store) {
    return {
        dataResult: store.dataResults,
        total: totalResults(store),
        percent: percentResults(store),
    }
}

function MDTP (dispatch) {
    return {
        closeModalFunc: function () {
            dispatch(resultIsInactive())
        },
    }
}

export default connect(mSTP, MDTP)(PersonalResults);