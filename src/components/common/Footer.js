import React from 'react'
import './../../css/footer.css'

import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-media-links'>
                <a href='https://t.me/@da_bl1nk' className='telegram'><TelegramIcon fontSize='large'/></a>
                <a href='https://github.com/bl1nkker' className='github'><GitHubIcon fontSize='large'/></a>
                <a href='https://www.linkedin.com/in/daniyar-auezkhan-3327631b9/k' className='linkedin'><LinkedInIcon fontSize='large'/></a>
                <a href='https://www.instagram.com/__d19._/' className='instagram'><InstagramIcon fontSize='large'/></a>
                <a href='https://vk.com/id335464864' className='vk'><ModeCommentIcon fontSize='large'/></a>
            </div>
            <p>© Copyright 2020-2021</p>
            <p>All right reserved. Powered by Netlify (or whatever)</p>
        </div>
    )
}

export default Footer
