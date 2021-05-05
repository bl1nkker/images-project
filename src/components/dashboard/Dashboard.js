import React from 'react'
import ImageSummary from './ImageSummary.js'
import './../../css/imageDashboard.css'
import './../../css/imageSummary.css'

function Dashboard({ images, setWaitingMode, operationSuccess,setOperationSuccess,operationName, setOperationName}) {
    return (
        <div className='dashboard-container'>
            {images?.map(imageObject => 
            <ImageSummary 
                    key={imageObject._id} 
                    imageObject={imageObject} 
                    setWaitingMode={setWaitingMode} 
                    operationSuccess={operationSuccess} 
                    setOperationSuccess={setOperationSuccess}
                    operationName={operationName}
                    setOperationName={setOperationName}/>)}
        </div>
    )
}

export default Dashboard
