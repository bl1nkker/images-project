import { CREATE_IMAGE, CREATE_IMAGE_ERROR, DELETE_IMAGE, DELETE_IMAGE_ERROR, FETCH_IMAGES, FETCH_IMAGES_ERROR, FIND_IMAGES, FIND_IMAGES_ERROR, LIKE_IMAGE, LIKE_IMAGE_ERROR, SET_IMAGE_TO_EDIT, UPDATE_IMAGE, UPDATE_IMAGE_ERROR } from '../types.js'
import * as axios from './../../axios/index.js'

export const fetchImages = () => async(dispatch) =>{
        // Here send request to the server
        try {
            const { data } = await axios.fetchImages()
            dispatch({ type:FETCH_IMAGES, payload: {data:data.data.getAllImages} }) 
        } catch (error) {
            dispatch({ type:FETCH_IMAGES_ERROR, payload: { error:error } })
        }
}

export const createImage = (formData, setOperationSuccess) => async(dispatch) =>{
    try {
        const { data } = await axios.createImage(formData)
        dispatch({ type:CREATE_IMAGE, payload: { createdImage:data.data.createImage } })
        setOperationSuccess(true)
    } catch (error) {
        dispatch({ type:CREATE_IMAGE_ERROR, payload: { error:error } })
    }
}

export const likeImage = (imageId) => async(dispatch) =>{
    try {
        const { data } = await axios.likeImage(imageId)
        dispatch({ type:LIKE_IMAGE, payload: { likes:data.data.likeImageHandler.likes, imageId } })
    } catch (error) {
        dispatch({ type:LIKE_IMAGE_ERROR, payload: { error:error } })
    }
}

export const deleteImage = (imageId, setOperationSuccess) => async(dispatch) =>{
    try {
        await axios.deleteImage(imageId)
        setOperationSuccess(true)
        dispatch({ type:DELETE_IMAGE, payload: { imageId } })
    } catch (error) {
        dispatch({ type:DELETE_IMAGE_ERROR, payload: { error:error } })
    }
}

export const setImageToEdit = (image) => (dispatch) =>{
    dispatch({ type:SET_IMAGE_TO_EDIT, payload: { image }})
}

export const editImage = (imageId, { image, creatorUsername, tags }, setOperationSuccess) => async(dispatch) =>{
    try {
        const { data } = await axios.editImage(imageId, { image, creatorUsername, tags })
        setOperationSuccess(true)
        dispatch({ type:UPDATE_IMAGE, payload:{ data:data.data.updateImage } })
    } catch (error) {
        dispatch({ type:UPDATE_IMAGE_ERROR, payload: { error:error } })
    }
}

export const findImagesByTags = (tags) => async(dispatch) =>{
    try {
        const { data } = await axios.findImagesByTags(tags)
        console.log(data.data.findImagesByTags)
        dispatch({ type:FIND_IMAGES, payload:{ data:data.data.findImagesByTags } })
    } catch (error) {
        dispatch({ type:FIND_IMAGES_ERROR, payload: { error:error } })
    }
    
    
}