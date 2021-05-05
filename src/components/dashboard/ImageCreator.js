import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { editImage } from './../../redux/actions/imageActions'
import { saveEditedImage } from './../../redux/actions/authActions'

function ImageCreator({ cancelHandler, createdImageHandler, createdImage, setCreatedImage, imageToEdit, setWaitingMode,setOperationSuccess, setOperationName }) {
    const dispatch = useDispatch()
    console.log(imageToEdit)
    const [updatedImage, setUpdatedImage] = useState(imageToEdit?.image ? {...imageToEdit, tags:imageToEdit?.tags.join(', ')} : null)
    console.log(updatedImage)

    const updateImageHandler = () =>{
        dispatch(editImage(updatedImage._id, {...updatedImage, tags:updatedImage.tags.split(', ')}, setOperationSuccess))
        dispatch(saveEditedImage(updatedImage._id, {...updatedImage, tags:updatedImage.tags.split(', ')}))
        cancelHandler()
        setWaitingMode(true)
        setOperationName('edit')
    }
    return (
        <div className='event-modal'>
        <h3 className='event-modal-header'>{ updatedImage ? 'Edit Image' : 'Add Image'}</h3>
        <form onSubmit={(event) => event.preventDefault()} className='event-modal-form'>
            <div className='event-modal-field'>
                    <label htmlFor='img'>Upload Image</label>
                    <FileBase type='file' multiple={false} value={updatedImage && updatedImage.image.toString()} 
                    onDone={({base64}) => updatedImage ? 
                    setUpdatedImage({...updatedImage, image: base64})
                    :
                    setCreatedImage({ ...createdImage, image: base64 })} />
            </div>

            <div className='event-modal-field'>
                    <label htmlFor='tags'>...and add some tags!</label>
                    <input placeholder='Ex.: #picture, #creator_name'
                    className='event-modal-input input-field' id='tags' value={updatedImage ? updatedImage.tags: createdImage.tags} 
                    onChange={(event) => updatedImage ? 
                        setUpdatedImage({...updatedImage, tags: event.target.value}) 
                        :
                        setCreatedImage({ ...createdImage, tags: event.target.value})} type='text'/>
            </div>
        </form>
        <section className='event-modal-actions'>
            <button className='btn-main' onClick={cancelHandler}>Let me think</button>
             {updatedImage ? 
             <button className='btn-main' onClick={updateImageHandler}>Edit</button> 
             :
             <button className='btn-main' onClick={createdImageHandler}>I like it!</button>}
        </section>
    </div>
    )
}

export default ImageCreator
