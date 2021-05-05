import * as axios from './../../axios/index.js'
import { LOG_OUT_USER, SIGN_IN_USER, SIGN_IN_USER_ERROR, SIGN_UP_USER, SIGN_UP_USER_ERROR, SAVE_IMAGE, SAVE_IMAGE_ERROR, STORE_LIKE, SAVE_CREATED_IMAGE, SAVE_CREATED_IMAGE_ERROR, DELETE_FROM_USER_IMAGE, DELETE_FROM_USER_IMAGE_ERROR, EDIT_CREATED_IMAGE, EDIT_CREATED_IMAGE_ERROR } from './../types.js'

export const signInUser = ({ email, password}, history) => async(dispatch) =>{
    
    try {
        // Query to Sign In
        const { data } = await axios.signInUser(email,password)
        dispatch({ type:SIGN_IN_USER, payload:{ data:data.data.signInUser } })
        history.push('/')
    } catch (error) {
        dispatch({ type:SIGN_IN_USER_ERROR, payload:{ error } })
    }
    
}

export const signUpUser = ({ email, password, username }, history) => async(dispatch) =>{
    try {
        const { data } = await axios.signUpUser(email, password, username)
        dispatch({ type:SIGN_UP_USER, payload:{ data:data.data.signUpUser } })
        history.push('/')
    } catch (error) {
        dispatch({ type:SIGN_UP_USER_ERROR, payload:{ error } })
    }
}

export const logOutUser = (history) => (dispatch) =>{
    dispatch({ type:LOG_OUT_USER, payload: { data:{} } })
    history.push('/auth')
}

// Hate myself (delete this plz))
export const saveImage = (imageId, setOperationSuccess) => async(dispatch) =>{
    try {
        const {data} = await axios.saveImage(imageId)
        dispatch({ type:SAVE_IMAGE, payload: { savedImages:data.data.saveImageHandler.savedImages } })
        setOperationSuccess(true)
    } catch (error) {
        dispatch({ type:SAVE_IMAGE_ERROR, payload: { error:error } })
    }
}

export const saveCreatedImage = (formData, userId) => async(dispatch) =>{
    try {
        const createdImage = {...formData, likes:[], creatorId:userId}
        dispatch({ type:SAVE_CREATED_IMAGE, payload: { data:createdImage } })
    } catch (error) {
        dispatch({ type:SAVE_CREATED_IMAGE_ERROR, payload: { error:error } })
    }
}

export const deleteImageFromUser = (imageId) => async(dispatch) =>{
    try {
        dispatch({ type:DELETE_FROM_USER_IMAGE, payload: { data:imageId } })
    } catch (error) {
        dispatch({ type:DELETE_FROM_USER_IMAGE_ERROR, payload: { error:error } })
    }
}

export const saveEditedImage = (imageId, { image, creatorUsername, tags }) => async(dispatch) =>{
    try {
        dispatch({ type:EDIT_CREATED_IMAGE, payload: { imageId:imageId, image, creatorUsername, tags } })
    } catch (error) {
        dispatch({ type:EDIT_CREATED_IMAGE_ERROR, payload: { error:error } })
    }
}

// Hate myself (delete this plz))
export const storeLike = (imageId) => async(dispatch) =>{
    dispatch({ type: STORE_LIKE, payload: { imageId } })
}