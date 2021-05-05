import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { findImagesByTags, fetchImages } from './../../redux/actions/imageActions'

import SearchIcon from '@material-ui/icons/Search';

function SearchField() {
    const dispatch = useDispatch()
    const [tags, setTags] = useState()

    const searchHandler = () =>{
        if (tags[0] === '' || tags === ['']){
            return dispatch(fetchImages())
        }
        
        if (typeof tags === 'string') setTags(tags.split(', '))
        console.log(tags.split(', '))
        dispatch(findImagesByTags(tags.split(', ')))
    }

    return (
        <div className='search-container'>
            <input className='search-field input-field' onChange={(event) => setTags(event.target.value)} value={tags} type='text' placeholder='Input image tags here! Ex.: #meme, #clock'/>
            <button className='search-button btn-alt' onClick={searchHandler}><SearchIcon /></button>
        </div>
    )
}

export default SearchField
