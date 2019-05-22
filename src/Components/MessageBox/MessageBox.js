import React from 'react';
import {connect} from 'react-redux';

import Modal from '../ModalChild/ModalChild';

import {clearMessageText} from '../../redux/actions/messageTextActions';
import {hideRegistration} from "../../redux/actions/registrationAction";


const MessageBox = (props) => {

    const closeMsgBox = (e) => {
        if (e.target.id === 'overlay' || e.target.id === 'closeSymbol') {
            props.closeModalFunc();
            props.clearMessageTextFunc();
        }
    };

    return (
        <Modal closeModal={closeMsgBox}>
            <p>{props.messageText}</p>
        </Modal>
    )
};

function MSTP (state) {
    return {
        messageText: state.messageText
    }
}

function MDTP (dispatch) {
    return {
        clearMessageTextFunc: function () {
            dispatch(clearMessageText())
        },
        closeModalFunc: function () {
            dispatch(hideRegistration())
        },
    }
}

export default connect(MSTP, MDTP) (MessageBox);
