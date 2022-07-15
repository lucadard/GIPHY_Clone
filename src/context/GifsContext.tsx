import React, { useState, createContext } from 'react'

import { useGifs } from '../hooks/useGifs'
import { Gif as GifType } from '../types'

const Context = createContext({})

type Props = {
    children: any
}

export function GifsContextProvider({ children }: Props) {
    const [gifs, setGifs] = useState<Array<GifType>>([])
    const [lastQuery, setLastQuery] = useState('')
    return (
        <Context.Provider value={{ gifs, setGifs, lastQuery, setLastQuery }}>
            {children}
        </Context.Provider>
    )
}

export default Context