import React, { useState, createContext, useEffect } from 'react'

import { ContextType } from '../types'
import { Gif as GifType } from '../types'

const Context = createContext<ContextType>({
    gifs: [],
    setGifs: () => null,
    lastQuery: '',
    setLastQuery: () => null,
    message: {
        text: '',
        show: false,
    },
    setMessage: () => null,
})

type Props = {
    children: any
}

export function GifsContextProvider({ children }: Props) {
    const [gifs, setGifs] = useState<Array<GifType>>([])
    const [lastQuery, setLastQuery] = useState('')
    const [message, setMessage] = useState({ text: '', show: false })
    return (
        <Context.Provider value={{ gifs, setGifs, lastQuery, setLastQuery, message, setMessage }}>
            {children}
        </Context.Provider>
    )
}

export default Context