import React, { useState, createContext, useEffect } from 'react'
import { useLocation } from 'wouter'
import getGifs, { getRelatedGifs } from '../services/getGifs'

import { HistoryContextType, Gif as GifType } from '../types'

const Context = createContext<HistoryContextType>({
    gifHistory: {
        prevGifs: [],
        nextGifs: []
    },
    handleSetNewGif: () => null,
    toPreviousGif: () => null,
    toNextGif: () => null
})

type Props = {
    children: any
}

export function HistoryContextProvider({ children }: Props) {
    const [currentGif, setCurrentGif] = useState<GifType>()
    const [gifHistory, setGifHistory] = useState<HistoryContextType['gifHistory']>({ prevGifs: [], nextGifs: [] })
    const [location, setLocation] = useLocation()

    const clearHistory = () => {
        setCurrentGif(undefined)
        setGifHistory({ prevGifs: [], nextGifs: [] })
    }

    useEffect(() => {
        if (!location.includes('/gifs/')) clearHistory()
    }, [location])


    const toPreviousGif = () => {
        if (!gifHistory.prevGifs.length) return
        setCurrentGif(newNextGif => {
            if (newNextGif) {
                let newCurrentGif = gifHistory.prevGifs[0]
                setGifHistory({
                    prevGifs: gifHistory.prevGifs.slice(1),
                    nextGifs: [newNextGif, ...gifHistory.nextGifs]
                })
                setLocation(`/gifs/${newCurrentGif.description}/${newCurrentGif.id}`)
                return newCurrentGif
            }
        })
    }

    const toNextGif = async (id: string,) => {
        let randomOffset = Math.ceil(Math.random() * 10) + 5
        let [randomCurrentGif] = await getRelatedGifs(id, 1, randomOffset)
        setCurrentGif(newPrevGif => {
            if (newPrevGif) {
                let newCurrentGif = gifHistory.nextGifs[0] || randomCurrentGif
                setGifHistory({
                    nextGifs: gifHistory.nextGifs.slice(1),
                    prevGifs: [newPrevGif, ...gifHistory.prevGifs]
                })
                setLocation(`/gifs/${newCurrentGif.description}/${newCurrentGif.id}`)
                return newCurrentGif
            }
        })
    }

    const handleSetNewGif = (gif: GifType) => {
        setCurrentGif(prevGif => {
            if (prevGif) setGifHistory({ ...gifHistory, prevGifs: [prevGif, ...gifHistory.prevGifs] })
            return gif
        })
    }

    return (
        <Context.Provider value={{ gifHistory, handleSetNewGif, toPreviousGif, toNextGif }}>
            {children}
        </Context.Provider>
    )
}

export default Context