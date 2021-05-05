import React, { useState, useEffect } from 'react'
import InputField from './InputField.js'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser, signUpUser } from './../../redux/actions/authActions'
import { useHistory } from 'react-router-dom'
import './../../css/auth.css'

function Auth() {
    const history = useHistory()
    const dispatch = useDispatch()
    const authError = useSelector(state => state.user.error)
    
    const [formData, setFormData] = useState({ email:'',password:'', userName:'' })
    // True - Sign In, False - Sign Up
    const [authToggler, setAuthToggler] = useState(true)

    useEffect(() => setFormData({ email:'',password:'', userName:'' }), [authError])

    const handleChange = (event) =>{
        event.preventDefault()
        setFormData({...formData, [event.target.id]:event.target.value })
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        if (authToggler){ dispatch(signInUser(formData, history)) }
        else{ dispatch(signUpUser(formData, history)) }
    }

    return (
        <form className={`auth-form ${authError ? 'auth-error' : 'auth-success'}`} onSubmit={(event) => handleSubmit(event)}>
            {!authToggler &&
            <>
                <InputField name='username' type='text' label='User Name'  handleChange={handleChange}/>
            </>}
            <InputField name='email' value={formData.email} type='email' label='Email' handleChange={handleChange}/>
            <InputField name='password' value={formData.password} type='password' label='Password' handleChange={handleChange}/>
            
            <button className='btn-alt' type='submit'>Sign {authToggler ? 'In' : 'Up'}</button>
            <button className='btn-alt' onClick={() => setAuthToggler(!authToggler)}>{authToggler ? 'I want to create an account' : 'I already have an account'}</button>
        </form>
    )
}

export default Auth
