import React from 'react'

function InputField({ name, handleChange, type, label, value }) {
    return (
        <>
        <input className='input-field' placeholder={`Input your ${name} here...`} value={value} required={true} id={name} onChange={handleChange} type={type}/><br/>
        </>
    )
}

export default InputField
