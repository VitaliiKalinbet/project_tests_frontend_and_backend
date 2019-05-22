import React from 'react';
import styles from './ModalChild.css';

const ModalChild = (props) => {
    
    return ( 
        <div className={styles.modal__backdrop} id='overlay' onClick={props.closeModal}>
            <div className={styles.modal__window}>
                <p className={styles.modalWindow__close} id='closeSymbol' onClick={props.closeModal}>&#215;</p>
                {props.children}
            </div>
        </div> 
    )
};

export default ModalChild;