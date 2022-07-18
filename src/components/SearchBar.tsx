import React, { useState } from 'react'
import { useLocation } from 'wouter'

type Props = {}

const Home = (props: Props) => {
    const [input, setInput] = useState('')
    const [location, setLocation] = useLocation()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!input) return
        setInput('')
        setLocation(`/search/${input}`);
    }

    // const handleClearSearch = () => clearGifs()

    return (
        <form onSubmit={handleSubmit}>
            <input value={input} onChange={handleInputChange} type="text" name='name' placeholder='Search for a GIF' />
            <button>🔎</button>
        </form>
    )
}

export default Home