import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'

import './NavBar.css'
import getCategories from '../services/getCategories'
import SearchBar from './SearchBar'
import { useGifs } from '../hooks/useGifs'

type Props = {}

const NavBar = (props: Props) => {
    const { clearGifs } = useGifs()

    const [categories, setCategories] = useState<any>({})
    const [showDropdown, setShowDropdown] = useState(false)
    const [navScroll, setNavScroll] = useState(false)
    const searchBarRef = useRef(null)

    const handleShowCategories = () => {
        setShowDropdown(!showDropdown)
        if (Object.keys(categories).length === 0)
            getCategories().then(setCategories)
    }

    const handleHideCategories = () => {
        setShowDropdown(false)
    }

    const onScroll = () => {
        //this function doesnt detect the current value of navScroll, always is false
        if (window.pageYOffset >= 48) setNavScroll(true)
        else setNavScroll(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`navbar ${navScroll ? 'scroll' : ''}`}>
            <div className='logo' onClick={clearGifs}>
                <Link to='/'>
                    <span>GIPHY</span>
                </Link>
            </div>
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
                                <a href={`/categories/${categories[index].name}`}>
                                    <span>
                                        {categories[index].name}
                                    </span>
                                </a>
                            </li>)}
                    </ul>
                </div>
                <div className='footer'></div>
            </div>
            <div className='searchbar' ref={searchBarRef} >
                <SearchBar />
            </div>
        </div>
    )
}

export default NavBar