import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import { motion } from 'framer-motion'

import getCategories from '../services/getCategories'
import SearchBar from './SearchBar'
import { useGifs } from '../hooks/useGifs'

import '../styles/NavBar.css'

const logoVariants = {
    default: { y: 0 },
    scroll: { y: 55 },
};

const inputVariants = {
    default: { marginLeft: "auto", width: "100%" },
    scroll: { marginLeft: "auto", width: "80%" },
};

const NavBar = () => {
    const { clearGifs } = useGifs()
    const [categories, setCategories] = useState<any>({})
    const [showDropdown, setShowDropdown] = useState(false)
    const [navScroll, setNavScroll] = useState(false)

    const handleShowCategories = () => {
        setShowDropdown(!showDropdown)
        if (Object.keys(categories).length === 0)
            getCategories().then(setCategories)
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
            <motion.div className='logo'
                onClick={clearGifs}
                variants={logoVariants}
                animate={navScroll ? "scroll" : "default"}
                transition={{
                    duration: navScroll ? 0.5 : 0.2,
                    delay: navScroll ? 0.3 : 0,
                    ease: "easeOut"
                }}
            >
                <Link to='/'>
                    <span>GIPHY</span>
                </Link>
            </motion.div>
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
            <motion.div className='searchbar'
                variants={inputVariants}
                animate={navScroll ? "scroll" : "default"}
                transition={{
                    duration: navScroll ? 0.5 : 0.2,
                    delay: navScroll ? 0 : 0.1,
                    type: "spring",
                    bounce: 0
                }}>
                <SearchBar />
            </motion.div>
        </div>
    )
}

export default NavBar