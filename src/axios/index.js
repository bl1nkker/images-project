import axios from 'axios'
import { fetchImagesQuery, createImageMutation, likeImageMutation, saveImageMutation, deleteImageMutation, editImageMutation, findImagesByTagsQuery } from './../graphql/imageGraphql.js'
import { signInUserQuery, signUpMutation } from './../graphql/authGraphql.js' 

// const API = axios.create({ baseURL: 'https://bl1nk-images.herokuapp.com/graphql' })
const API = axios.create({ baseURL: 'http://localhost:5000/graphql' })

API.interceptors.request.use( (req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
} )

export const fetchImages = () => API.post('/', { query:fetchImagesQuery })
export const findImagesByTags = (tags) => API.post('/', { query:findImagesByTagsQuery, variables: { tags:tags } })
export const createImage = ({ image, creatorUsername, tags }) => API.post('/', { query:createImageMutation, variables: { image, creatorUsername, tags } })
export const likeImage = (imageId) => API.post('/', { query:likeImageMutation, variables: { imageId } })
export const saveImage = (imageId) => API.post('/', { query:saveImageMutation, variables: { imageId } })
export const deleteImage = (imageId) => API.post('/', { query:deleteImageMutation, variables: { imageId } })
export const editImage = (imageId, { image, creatorUsername, tags }) => API.post('/', { query:editImageMutation, variables:{ imageId ,image, creatorUsername, tags  } })

export const signInUser = (email, password) => API.post('/', { query:signInUserQuery, variables: { email, password } })
export const signUpUser = (email, password, username) => API.post('/', { query:signUpMutation, variables: { email, password, username } })