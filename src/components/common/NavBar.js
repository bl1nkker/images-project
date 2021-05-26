import React, { useState, useEffect } from 'react'
import './../../css/navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOutUser } from './../../redux/actions/authActions.js'
import decode from 'jwt-decode'

import { useHistory } from 'react-router-dom'

function NavBar() {
    const history = useHistory()
    // const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )

    // This component will updates, when location is changes.
    // Location (current page) is changed in 2 cases:
    // When user is Signed in or LogOut
    // Default case (user redirected to the page on his/her own)
    useEffect( () => {
        const token = user?.token
        

        if (token) {
            const decodedToken = decode(token)

            // If expiring time of token is expired, then user will log out
            if (decodedToken.exp * 1000 < new Date().getTime()) logOutHandler()
        } 
        setUser( JSON.parse(localStorage.getItem('profile')) )
    }, [location] )

    const logOutHandler = () =>{
        dispatch(logOutUser(history))
        setUser(null)
    }
    return (
        <nav className='navbar-container'>
            <div className='navbar-title'>GLAIVE!</div>
            <ul className='navbar-items'>
                <li className='navbar-button'><Link to='/'>Home Page</Link></li>
                {user?.token && <>
                    <li className='navbar-button'><Link to='/created'>My Images</Link></li>
                    {/* No. */}
                    {/* <li><Link to='/liked'>Liked Images</Link></li> */}
                    <li className='navbar-button'><Link to='/saved'>Saved Images</Link></li>
                </>}
                
                <li className='navbar-button'>{user?.token ? <button  onClick={logOutHandler}>Sign Out</button> : <Link to='/auth'>Sign In</Link>}</li>
                
            </ul>
            {user?.token && <p className='navbar-userlogo'>{user?.currentUserData.username}</p> }
        </nav>
    )
}

export default NavBar
