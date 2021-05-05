import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Dashboard from './../dashboard/Dashboard'
import ImageCreatorBackdrop from './../dashboard/ImageCreatorBackdrop.js'
import ActionModal  from './../dashboard/ActionModal'

function CreatedPage() {
    const user = useSelector(state => state.user)

    const [operationSuccess, setOperationSuccess] = useState(false)
    const [waitingMode, setWaitingMode] = useState(false)
    const [operationName, setOperationName] = useState('')
    return (
        <div>
            {waitingMode && 
                <>
                    <ImageCreatorBackdrop />
                    <ActionModal 
                    setWaitingMode={setWaitingMode} 
                    operationSuccess={operationSuccess} 
                    setOperationSuccess={setOperationSuccess}
                    operationName={operationName}
                    setOperationName={setOperationName}/>
                </>}
            <Dashboard 
                    setWaitingMode={setWaitingMode} 
                    operationSuccess={operationSuccess} 
                    setOperationSuccess={setOperationSuccess}
                    operationName={operationName}
                    setOperationName={setOperationName} 
                    images={user.currentUserData.createdImages}/>
        </div>
    )
}

export default CreatedPage
