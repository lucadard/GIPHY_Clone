import { useContext, useState } from 'react'

import { ContextType } from '../types'
import getGifs from '../services/getGifs'
import GifsContext from '../context/GifsContext'

const SEARCH_LIMIT = 25;

export const useGifs = () => {
    const [loading, setLoading] = useState(false)
    const { gifs, setGifs, setLastQuery } = useContext<ContextType>(GifsContext)

    const searchGifs = async (input: string) => {
        setLoading(true)
        const gifSearch = await getGifs(input, SEARCH_LIMIT)
        setGifs(gifSearch)
        setLastQuery(input)
        setLoading(false)
    }

    const addGifs = async (input: string, offset: number) => {
        const newGifs = await getGifs(input, SEARCH_LIMIT, offset)
        setGifs(gifs.concat(newGifs))
    }

    const clearGifs = () => setGifs([])

    return {
        gifs,
        searchGifs,
        addGifs,
        loading,
        // fetched,
        clearGifs
    }
}