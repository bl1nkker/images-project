import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchImages, createImage, setImageToEdit } from './../../redux/actions/imageActions'
import { saveCreatedImage } from './../../redux/actions/authActions'

import Dashboard from './../dashboard/Dashboard'
import ImageCreator from './../dashboard/ImageCreator.js'
import ImageCreatorBackdrop from './../dashboard/ImageCreatorBackdrop.js'
import ActionModal  from './../dashboard/ActionModal'
import SearchField from './../dashboard/SearchField'
import Loader from './../common/Loader'

import './../../css/modal.css'
import './../../css/homepage.css'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

function HomePage() {
    // Fetched Images
    const images = useSelector(state => state.images.data)
    const foundImages = useSelector(state => state.images.searchedImages)
    const imageToEdit = useSelector(state => state.images.imageToEdit)
    const user = useSelector(state => state.user)
    const [creatorMode, setCreatorMode] = useState(false)
    const [createdImage, setCreatedImage] = useState({ image:'', tags:[] })
    const [operationSuccess, setOperationSuccess] = useState(false)
    const [waitingMode, setWaitingMode] = useState(false)
    const [operationName, setOperationName] = useState('save')

    const dispatch = useDispatch()
    
    // Fetch Images
    useEffect( () =>{
        dispatch(fetchImages())
    }, [imageToEdit, dispatch] )

    const cancelHandler = () =>{
        dispatch(setImageToEdit(null))
        setCreatedImage({ image:'', tags:[] })
        setCreatorMode(false)
    }

    const createImageHandler = () =>{
        // Send request to create image
        const imageToUpload = {...createdImage, tags: createdImage.tags.split(', '), creatorUsername:user.currentUserData.username}
        dispatch(createImage(imageToUpload, setOperationSuccess))
        dispatch(saveCreatedImage(imageToUpload, user.userId))
        setCreatedImage({ image:'', tags:[] })
        setCreatorMode(false)
        setWaitingMode(true)
        setOperationName('create')
    }
    
    return (
        <div className='home-container'>
            { images.length !== 0 ?
            <>
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
            {user.token && (creatorMode || imageToEdit) &&
                <>
                    <ImageCreatorBackdrop />
                    <ImageCreator 
                    setWaitingMode={setWaitingMode} 
                    setOperationSuccess={setOperationSuccess}
                    setOperationName={setOperationName}
                    
                    cancelHandler={cancelHandler} 
                    imageToEdit={imageToEdit} 
                    createdImageHandler={createImageHandler} createdImage={createdImage} setCreatedImage={setCreatedImage} setCreatorMode={setCreatorMode}/>
                </>}
            <div className='home-content'>
                {user.token && 

                <div className='create-container'>
                    <div className='create-arrows'>
                        <ExpandMoreIcon fontSize='large'/>
                        <ExpandMoreIcon fontSize='large'/>
                        <ExpandMoreIcon fontSize='large'/>
                    </div>
                    <button className='btn-alt' onClick={() => setCreatorMode(!creatorMode)}><AddPhotoAlternateIcon fontSize='large'/></button>
                </div>
                }
                <SearchField />
                <Dashboard 
                        setWaitingMode={setWaitingMode} 
                        operationSuccess={operationSuccess} 
                        setOperationSuccess={setOperationSuccess}
                        operationName={operationName}
                        setOperationName={setOperationName} 
                        images={foundImages ? foundImages : images}/>
            </div>
            
            </>
            :
            // Loader here
            <Loader />}
        </div>
        
        
    )
}

export default HomePage
