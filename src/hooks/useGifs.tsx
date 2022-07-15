import { useContext } from 'react'

import getGifs from '../services/getGifs'
import GifsContext from '../context/GifsContext'

const SEARCH_LIMIT = 25;

export const useGifs = () => {
    const { gifs, setGifs, setLastQuery } = useContext<any>(GifsContext)

    const searchGifs = async (input: string) => {
        const gifSearch = await getGifs(input, SEARCH_LIMIT)
        setGifs(gifSearch)
        setLastQuery(input)
    }

    const addGifs = (input: string, offset: number) => {
        getGifs(input, SEARCH_LIMIT, offset).then(newGifs => {
            setGifs(gifs.concat(newGifs))
        })
    }

    const clearGifs = () => {
        setGifs([])
    }

    return {
        gifs,
        searchGifs,
        addGifs,
        clearGifs
    }
}