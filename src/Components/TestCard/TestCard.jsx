import React from 'react';
import {connect} from 'react-redux';
import {addCurrentResult} from '../../redux/actions/currentResultActions';
import {addCurrentAnswers} from '../../redux/actions/currentAnswerActions';
import styles from './TestCard.css';


const checkedInd = [];

const TestCard = ({testname, index, question, answers, clas, addCurrentAnswers, correctResult, addCurrentResult}) => {

    const addCurrentAnswersFunc = (e) => {
        addCurrentAnswers(e.target.value, e.target.dataset.index);

        let data;
        (e.target.value === correctResult[e.target.dataset.index]) ? data = true : data = false;
        addCurrentResult(data, e.target.dataset.index);

        checkedInd[+e.target.dataset.index] = +e.target.dataset.checked_index;
    };

    switch (clas) {
        case "correct":
            return (
                <div className={`${styles.testcard} ${styles.testcardCor}`}>
                    <p className={styles.testcard__question}>{+index + 1}. {question}</p>
                    <form method='post' onChange={(addCurrentAnswersFunc)}>
                        {answers.map((answ, i) =>
                            <label
                                className={`${styles.testcard__answer} ${checkedInd[index] === i && styles.marked__answer_correct}`}
                                id={`${answ}${i}`}
                                key={`${testname}${i}`}
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    id={`${answ}${i}`}
                                    data-index={index}
                                    className={styles.testcard__answers}
                                    value={answ}
                                    disabled
                                />
                                {answ}
                            </label>
                        )}
                    </form>
                </div>
            );
        case "wrong":
            return (
                <div className={`${styles.testcard} ${styles.testcardInc}`}>
                    <p className={styles.testcard__question}>{+index + 1}. {question}</p>
                    <form method='post' onChange={(addCurrentAnswersFunc)}>
                        {answers.map((answ, i) =>
                            <label
                                className={`${styles.testcard__answer} ${checkedInd[index] === i && styles.marked__answer_wrong}`}
                                id={`${answ}${i}`}
                                key={`${testname}${i}`}
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    id={`${answ}${i}`}
                                    data-index={index}
                                    className={styles.testcard__answers}
                                    value={answ}
                                    disabled
                                />
                                {answ}
                            </label>
                        )}
                    </form>
                </div>
            );
      default:
        return (
          <div className={styles.testcard}>
            <ol start={+index + 1}>
              <li className={styles.testcard__question}>{question}</li>
            </ol>

            <form method='post' onChange={(addCurrentAnswersFunc)}>
              {answers.map((answ, i) =>
                <label
                  className={styles.testcard__answer}
                  id={`${answ}${i}`}
                  key={`${testname}${i}`}
                >
                  <input
                    type="radio"
                    name="answer"
                    id={`${answ}${i}`}
                    data-index={index}
                    className={styles.testcard__answers}
                    value={answ}
                    data-checked_index={i}
                  />
                  {answ}
                </label>
              )}
            </form>
          </div>
        );
    }
};

    function MSTP(state) {
        return {
            currentResult: state.currentResult,
            currentAnswer: state.currentAnswer,
            correctResult: state.correctResult,
        }
    }

    function MDTP(dispatch) {
        return {
            addCurrentResult: function (data, index) {
                dispatch(addCurrentResult(data, index))
            },
            addCurrentAnswers: function (data, index) {
                dispatch(addCurrentAnswers(data, index))
            },
        }
    }


export default connect(MSTP, MDTP)(TestCard);