import { CREATE_IMAGE, CREATE_IMAGE_ERROR, DELETE_IMAGE, DELETE_IMAGE_ERROR, FETCH_IMAGES, FETCH_IMAGES_ERROR, FIND_IMAGES, FIND_IMAGES_ERROR, LIKE_IMAGE, LIKE_IMAGE_ERROR, SAVE_IMAGE, SAVE_IMAGE_ERROR, SET_IMAGE_TO_EDIT, UPDATE_IMAGE, UPDATE_IMAGE_ERROR } from './../types'
const initState = {
    data: [],
    searchedImages:null,
    error: null,
    imageToEdit:null
}

const imageReducer = (state=initState, action) =>{
    switch(action.type){
        case CREATE_IMAGE:
            return { ...state, data: [...state.data, action.payload.createdImage] }
        case CREATE_IMAGE_ERROR:
            return {...state, error: action.payload.error}

        case FETCH_IMAGES:
            return { ...state, data: action.payload.data, searchedImages:null }
        case FETCH_IMAGES_ERROR:
            return {...state, error: action.payload.error}

        case DELETE_IMAGE:
            return {...state, data:[...state.data].filter(image => image._id !== action.payload.imageId)}
        case DELETE_IMAGE_ERROR:
            return {...state, error: action.payload.error}

        case FIND_IMAGES:
            return { ...state, searchedImages: action.payload.data }
        case FIND_IMAGES_ERROR:
            return {...state, error: action.payload.error}
        
        case UPDATE_IMAGE:
            console.log(action.payload.data)
            return {...state, data: state.data.map(image => image._id === action.payload.data._id ?
                action.payload.data : image)}
        case UPDATE_IMAGE_ERROR:
            return {...state, error: action.payload.error}
    
        case SET_IMAGE_TO_EDIT:
            return {...state, imageToEdit:action.payload.image}

        case LIKE_IMAGE:
            return {...state, data: state.data.map( (image) => image._id === action.payload.imageId ? { ...image, likes: action.payload.likes} : image)}
        case LIKE_IMAGE_ERROR:
            return {...state, error: action.payload.error}
        default:
            return state
    }
}

export default imageReducer