import React, { useState, createContext, useEffect } from 'react'

import { ContextType } from '../types'
import { Gif as GifType } from '../types'

const Context = createContext<ContextType>({
    gifs: [],
    setGifs: () => null,
    lastQuery: '',
    setLastQuery: () => null,
})

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