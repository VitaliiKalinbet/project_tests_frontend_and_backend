import React from 'react';
import {connect} from 'react-redux';
import {closeModal} from '../redux/actions/enterAction';
import {emailChangeClear} from '../redux/actions/emailChangeAction';
import {passChangeClear} from '../redux/actions/passChangeAction';


function modalCloseStateClear (props){
    props.closeModalFunc();
    props.emailChangeClearFunc();
    props.passChangeClearFunc();

}

function mapDispatchToProps (dispatch)
{
        return {
            closeModalFunc: function (value) {
                dispatch(closeModal(value))
            },
            emailChangeClearFunc: function (value) {
                dispatch(emailChangeClear(value))
            },
            passChangeClearFunc: function (value) {
                dispatch(passChangeClear(value))
            },
        }
}

export default connect (null, mapDispatchToProps)(modalCloseStateClear);