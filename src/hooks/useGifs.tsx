import { useContext, useState } from 'react'

import { ContextType } from '../types'
import getGifs, { getRelatedGifs } from '../services/getGifs'
import GifsContext from '../context/GifsContext'

const SEARCH_LIMIT = 25;

export const useGifs = () => {
    const [loading, setLoading] = useState(false)
    const { gifs, setGifs, setLastQuery } = useContext<ContextType>(GifsContext)

    const searchGifs = async (input: { searchTerm: string, id: string }, type: string) => {
        setLoading(true)
        let gifSearch
        if (type === 'search') {
            gifSearch = await getGifs(input.searchTerm, SEARCH_LIMIT)
            setLastQuery(input.searchTerm)
        }
        else gifSearch = await getRelatedGifs(input.id, SEARCH_LIMIT)
        setGifs(gifSearch)
        setLoading(false)
    }

    const addGifs = async (input: { searchTerm: string, id: string }, offset: number, type: string) => {
        setLoading(true)
        let newGifs
        if (type === 'search') newGifs = await getGifs(input.searchTerm, SEARCH_LIMIT, offset)
        else newGifs = await getRelatedGifs(input.id, SEARCH_LIMIT, offset)
        setGifs(gifs.concat(newGifs))
        setLoading(false)
    }

    const clearGifs = () => {
        setGifs([])
        setLastQuery('')
    }

    return {
        gifs,
        searchGifs,
        addGifs,
        loading,
        clearGifs
    }
}