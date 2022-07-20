import React, { useState } from 'react'
import { Link } from 'wouter'
import getCategories from '../services/getCategories'
import SearchBar from './SearchBar'

type Props = {}

const NavBar = (props: Props) => {
    const [categories, setCategories] = useState<any>({})
    const [showDropdown, setShowDropdown] = useState(false)

    const handleShowCategories = () => {
        setShowDropdown(!showDropdown)
        if (Object.keys(categories).length === 0)
            getCategories().then(setCategories)
    }

    const handleHideCategories = () => {
        setShowDropdown(false)
    }

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
                        <li className={`${showDropdown ? 'hover' : ''}`} onClick={handleShowCategories}>
                            <span>...</span>
                        </li>
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
                <div className={`categoriesDropdown ${showDropdown ? 'show' : ''}`}
                    onMouseLeave={handleShowCategories}>
                    <div className='container'>
                        <h3>
                            <a href='/categories/all' style={{ textDecoration: 'none', color: 'inherit' }}>
                                Categories
                            </a>
                        </h3>
                        <div className='divisor'></div>
                        <ul>
                            {Object.keys(categories).map(index =>
                                <li key={categories[index].name}>
                                    <span>
                                        {categories[index].name}
                                    </span>
                                </li>)}
                        </ul>
                    </div>
                    <div className='footer'></div>
                </div>
            </div>
            <SearchBar />
        </div>
    )
}

export default NavBar