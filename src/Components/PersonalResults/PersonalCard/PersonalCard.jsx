import React from 'react';
import {connect} from 'react-redux';

import styles from './PersonalCard.css';
import sad from './images/sad.svg';
import weird from './images/weird.svg';
import smile from './images/smile.svg';

import {totalResults} from '../../../redux/selectors/totalResults';
import {percentResults} from '../../../redux/selectors/totalResults';

const PersonalCard = ({name, result, ratio, total, percent}) => {
    return (
        <tr className={styles.paddings}>
            
                <th className={styles.robotoGray}>{name}</th>
                <th className={styles.robotoGray}>{result}</th>
                <th className={styles.robotoGray}>
                {ratio <= 50 ? 
                              <div className={styles.flex}>
                                <span className={styles.red}>{ratio}% </span>
                                <img src={sad} alt="sad" className={styles.svg}/>
                              </div>
                              :
                              ratio > 50 && ratio <= 70 ?
                                                         <div className={styles.flex}>
                                                           <span className={styles.yellow}>{ratio}% </span>
                                                           <img src={weird} alt="weird" className={styles.svg}/>
                                                         </div>
                                                         :
                                                         ratio >= 80 ?
                                                                      <div className={styles.flex}>
                                                                        <span className={styles.green}>{ratio}% </span>
                                                                        <img src={smile} alt="smile" className={styles.svg}/>
                                                                      </div>
                                                                        :
                                                                        ratio }</th>
        </tr>
        
    );
};

function mSTP (store) {
    return {
        dataResult: store.dataResults,
        total: totalResults(store),
        percent: percentResults(store),
    }
}


export default connect(mSTP, null)(PersonalCard);