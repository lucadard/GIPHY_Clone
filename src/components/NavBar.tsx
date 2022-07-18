import React from 'react'
import { Link } from 'wouter'
import SearchBar from './SearchBar'

type Props = {}

const NavBar = (props: Props) => {
    return (
        <div className='navbar'>
            <div className='nav-upper'>
                <Link to='/'>
                    <div className='logo'>
                        <span>GIPHY</span>
                    </div>
                </Link>
                <div className='categories'>
                    <ul>
                        <li><span>Reactions</span></li>
                        <li><span>Entertainment</span></li>
                        <li><span>Sports</span></li>
                        <li><span>Stickers</span></li>
                        <li><span>Artists</span></li>
                        <li><span >...</span></li>
                    </ul>
                </div>
                <div className='actions'>
                    <span>Upload</span>
                    <span>Create</span>
                </div>
                <div className='login'>
                    <span>👤</span>
                    <span>Log in</span>
                </div>
            </div>
            <SearchBar />
        </div>
    )
}

export default NavBar