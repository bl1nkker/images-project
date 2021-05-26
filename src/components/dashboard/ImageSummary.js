import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeImage, deleteImage, setImageToEdit } from './../../redux/actions/imageActions'
import { saveImage,deleteImageFromUser } from './../../redux/actions/authActions'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';


function ImageSummary({ imageObject, setWaitingMode,setOperationSuccess, setOperationName }) {
    
    let [currentImage, setCurrentImage] = useState(imageObject)
    const [currentUser, setCurrentUser] = useState(useSelector(state => state.user))
    const dispatch = useDispatch()
    const likeHandler = () =>{
        const uid = currentUser.userId.toString()
        
        if (currentImage.likes.indexOf(uid) !== -1) {
            setCurrentImage({...currentImage, likes: [...currentImage.likes.filter( userId => parseInt(userId) === currentUser.userId )]}) 
        }
        else {setCurrentImage({...currentImage, likes: [...currentImage.likes, uid]})}
        // dispatch(storeLike(currentImage))
        dispatch(likeImage(currentImage._id))
    }

    const Likes = () => {
        if (currentImage.likes.length > 0) {
          return currentUser.userId.toString() !== -1 
            ? (
            //   <><ThumbUpAltIcon fontSize="small" />&nbsp;{currentImage.likes.length > 2 ? `You and ${currentImage.likes.length - 1} others` : `${currentImage.likes.length} like${currentImage.likes.length > 1 ? 's' : ''}` }</>
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{currentImage.likes.length} {currentImage.likes.length === 1 ? 'Like' : 'Likes'}</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{currentImage.likes.length} {currentImage.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };

    const Save = () =>{
        if (currentUser.currentUserData.savedImages.find(image => image._id === currentImage._id)){
            return <><AddCircleIcon fontSize='small'/>Unsave</>
        }
        return <><AddCircleOutlineIcon fontSize='small'/>Save</>
    }

    const deleteHandler = () =>{
        dispatch(deleteImage(currentImage._id, setOperationSuccess))
        dispatch(deleteImageFromUser(currentImage._id))
        setWaitingMode(true)
        setOperationName('delete')
    }

    const editHandler = () =>{
        // Send state, to activate modal
        dispatch(setImageToEdit(currentImage))
    }
    
    const saveHandler = () =>{
        // If image is already saved
        if (currentUser.currentUserData.savedImages.find(image => image._id === currentImage._id)) {
            // Unsave
            setCurrentUser({...currentUser, currentUserData: {...currentUser.currentUserData, savedImages: [...currentUser.currentUserData.savedImages.filter( image => parseInt(image._id) === currentImage._id )]}}) 
        }
        // Else save
        else {setCurrentUser({...currentUser, currentUserData: {...currentUser.currentUserData, savedImages: [...currentUser.currentUserData.savedImages, currentImage]}})}
        dispatch(saveImage(currentImage._id, setOperationSuccess))
        setWaitingMode(true)
        setOperationName('save')
    }

    return (
        <div className='image-summary-container'>
            {currentUser.userId === currentImage.creatorId && 
                <div className='image-creator-actions'>
                    <button className='btn-main' onClick={editHandler}><EditIcon fontSize='small'/></button>
                    <button className='btn-main' onClick={deleteHandler}><HighlightOffIcon fontSize='small'/></button>
                </div>}
            <div className='image-creator'>
                <span className='image-creator-icon'>{currentImage.creatorUsername[0].toUpperCase()}</span>
                <div className='image-creator-sum'>
                    <p className='image-creator-name'>{currentImage.creatorUsername}</p>
                    <p className='image-creator-time'>at {new Date(parseInt(currentImage.createdAt)).toUTCString()}</p>
                </div>
            </div>
            <img src={currentImage.image} alt='new'/>

            <div className='image-summary-tags'>
                {currentImage.tags.map( tag => <p className='image-summary-tag' key={Math.random()}>{tag}</p> )}
            </div>
            
            {currentUser.token && 
            <div className='image-summary-actions'>
                {/* <button className='btn-main' onClick={likeHandler}>{currentImage.likes.indexOf(currentUser.userId.toString()) !== -1 ? 'Unlike':'Like'}</button> */}
                <button className='btn-main' onClick={likeHandler}><Likes /></button>
                {/* <button className='btn-main' onClick={saveHandler}>{currentUser.currentUserData.savedImages.find(image => image._id === currentImage._id) ? 'Unsave':'Save'}</button> */}
                <button className='btn-main' onClick={saveHandler}><Save /></button>
                
            </div>}
            
            
        </div>
    )
}

export default ImageSummary
