import React from 'react'
import './../../css/actionModal.css'
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import DoneIcon from '@material-ui/icons/Done';

function ActionModal({ setWaitingMode, operationSuccess, setOperationSuccess, operationName, setOperationName }) {
    const OKHandler = () =>{
        setWaitingMode(false)
        setOperationSuccess(false)
    }
    return (
        <div className={`action-modal ${!operationSuccess ? 'wait' : 'success'}`} >
        <h3 className={`action-modal-header`}>
            {operationName === 'create' ?
                (operationSuccess ? 'Success!' : 'Wait for creation...')
            :
            operationName === 'save' ?
                (operationSuccess ? 'Success!' : 'Wait for saving...')
            :
            operationName === 'delete' ?
                (operationSuccess ? 'Success!' : 'Wait for deleting...') 
            :
            operationName === 'edit' &&
                (operationSuccess ? 'Success!' : 'Wait for editing...')}</h3>
        {operationSuccess &&
            <section className='action-modal-actions'> 
                <button className='btn-alt' onClick={OKHandler}><DoneIcon fontSize='medium'/></button>
            </section>}
        
    </div>
    )
}

export default ActionModal
