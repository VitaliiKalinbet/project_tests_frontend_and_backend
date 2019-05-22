import React from 'react';

import styles from './Main.css';

const Main = () => {

  return (
    <div className={styles.background}>
      <div className={styles.main__container}>
        <section className={styles.section}>
          <h1 className={styles.title}>Проверь свои знания Front End</h1>
          <p className={styles.sub__title}>Здравствуйте, дорогие студенты, надеемся что, тесты GoIT не только
            принесут вам пользу и знания, но и множество эмоций, и удовольствия от их прохождения!
          </p>
        </section>
      </div>
    </div>);
};
export default Main;