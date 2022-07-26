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
    handleCopyToClipboard: () => null
})

type Props = {
    children: any
}

export function GifsContextProvider({ children }: Props) {
    const [gifs, setGifs] = useState<Array<GifType>>([])
    const [lastQuery, setLastQuery] = useState('')
    const [message, setMessage] = useState({ text: '', show: false })

    function handleCopyToClipboard(url: string) {
        // line below is to copy to user clipboard, it gives errors without using https
        navigator.clipboard.writeText(url);
        if (message.show) return
        setMessage({ text: 'Link copied to clipboard!', show: true });
        setTimeout(() => {
            setMessage({ text: '', show: false });
        }, 5000)
    };

    return (
        <Context.Provider value={{ gifs, setGifs, lastQuery, setLastQuery, message, setMessage, handleCopyToClipboard }}>
            {children}
        </Context.Provider>
    )
}

export default Context