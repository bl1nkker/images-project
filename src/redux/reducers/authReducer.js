import { LOG_OUT_USER, SAVE_IMAGE_ERROR, SIGN_IN_USER, SIGN_IN_USER_ERROR, SIGN_UP_USER, SIGN_UP_USER_ERROR, SAVE_IMAGE, STORE_LIKE, SAVE_CREATED_IMAGE_ERROR, SAVE_CREATED_IMAGE, DELETE_FROM_USER_IMAGE, DELETE_FROM_USER_IMAGE_ERROR, EDIT_CREATED_IMAGE_ERROR, EDIT_CREATED_IMAGE } from './../types.js'

const initState = {
    token: '',
    tokenExpiration:'',
    userId:'',
    currentUserData:{},
    error:null
}

const authReducer = (state=initState, action) =>{
    switch(action.type){
        case SIGN_IN_USER:
            localStorage.setItem( 'profile', JSON.stringify({ ...action?.payload.data }) )
            return {...action.payload.data}
        case SIGN_IN_USER_ERROR:
            return {...state, error:action.payload.error}
        
        case SIGN_UP_USER:
            localStorage.setItem( 'profile', JSON.stringify({ ...action?.payload.data }) )
            return {...action.payload.data}
        case SIGN_UP_USER_ERROR:
            return {...state, error:action.payload.error}
        
        case SAVE_IMAGE:
            return {...state, currentUserData:{...state.currentUserData, savedImages:action.payload.savedImages}}
        case SAVE_IMAGE_ERROR:
            return {...state, error:action.payload.error}
        
        
        
        // Hate myself (delete this plz))
        case SAVE_CREATED_IMAGE:
            return {...state, currentUserData:{...state.currentUserData, 
                createdImages:[...state.currentUserData.createdImages, action.payload.data]}}
        case SAVE_CREATED_IMAGE_ERROR:
            return {...state, error:action.payload.error}
        
        case DELETE_FROM_USER_IMAGE:
            return {...state, currentUserData:{...state.currentUserData, 
                createdImages:state.currentUserData.createdImages.filter(image => image._id !== action.payload.data) }}
        case DELETE_FROM_USER_IMAGE_ERROR:
            return {...state, error:action.payload.error}
        
        case EDIT_CREATED_IMAGE:
            return {...state, currentUserData:{...state.currentUserData, 
                createdImages: state.currentUserData.createdImages.map(image => image._id === action.payload.imageId ?
                {...image, image: action.payload.image, 
                    creatorUsername:action.payload.creatorUsername, 
                    tags:action.payload.tags} : image)}}
        case EDIT_CREATED_IMAGE_ERROR:
            return {...state, error:action.payload.error}

        case STORE_LIKE:
            return {...state, currentUserData:{...state.currentUserData, likedImages:[...state.currentUserData.likedImages, action.payload.imageId]} }
        
        case LOG_OUT_USER:
            localStorage.clear()
            return {...action.payload.data}
            
        default:
            return state
    }
}

export default authReducer