import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import GifsContext from '../context/GifsContext'

type Props = {}

const SearchBar = (props: Props) => {
    const [input, setInput] = useState('')
    const { lastQuery } = useContext(GifsContext)
    const [location, setLocation] = useLocation()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!input) return
        // setInput('')
        setLocation(`/search/${input}`);
    }

    useEffect(() => {
        if (location.includes('/search/')) setInput(lastQuery)
        else setInput('')
    }, [location, lastQuery])

    // const handleClearSearch = () => clearGifs()

    return (
        <form onSubmit={handleSubmit}>
            <input autoFocus value={input} onChange={handleInputChange} type="text" name='name' placeholder='Search for a GIF' />
            <button>🔎</button>
        </form>
    )
}

export default SearchBar