import React, { createContext, useEffect, useReducer } from 'react'
import { useLocation } from 'wouter'
import { getRelatedGifs } from '../services/getGifs'

import { HistoryContextType, Gif as GifType, Gif } from '../types'

const Context = createContext<HistoryContextType>({
    state: {
        currentGif: null,
        gifHistory: {
            prevGifs: [],
            nextGifs: []
        }
    },
    toPreviousGif: () => null,
    toNextGif: () => null,
    handleSetNewGif: () => null
})

type Props = {
    children: any
}

enum ACTION {
    SET_CURRENT_GIF,
    SET_GIF_TO_PREV,
    SET_GIF_TO_NEXT,
    CLEAR_HISTORY
}

type state = {
    currentGif: GifType | null,
    gifHistory: { prevGifs: GifType[], nextGifs: GifType[] }
}

const initialState: state = {
    currentGif: null,
    gifHistory: { prevGifs: [], nextGifs: [] }
}

const reducer = (state: state, action: { type: ACTION, payload?: any }): state => {
    switch (action.type) {
        case ACTION.SET_CURRENT_GIF:
            return {
                ...state,
                currentGif: action.payload,
            }
        case ACTION.SET_GIF_TO_NEXT:
            return {
                ...state,
                gifHistory: {
                    prevGifs: state.gifHistory.prevGifs.slice(1),
                    nextGifs: [action.payload, ...state.gifHistory.nextGifs]
                }
            }
        case ACTION.SET_GIF_TO_PREV:
            return {
                ...state,
                gifHistory: {
                    nextGifs: state.gifHistory.nextGifs.slice(1),
                    prevGifs: [action.payload, ...state.gifHistory.prevGifs]
                }
            }
        case ACTION.CLEAR_HISTORY:
            return {
                currentGif: null,
                gifHistory: { prevGifs: [], nextGifs: [] }
            }
        default:
            return state
    }
}

export function HistoryContextProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [location, setLocation] = useLocation()

    const clearHistory = () => {
        dispatch({ type: ACTION.CLEAR_HISTORY })
    }

    useEffect(() => {
        if (!location.includes('/gifs/')) clearHistory()
    }, [location])

    const toPreviousGif = () => {
        if (!state.gifHistory.prevGifs.length) return
        if (state.currentGif) {
            let newCurrentGif = state.gifHistory.prevGifs[0]
            dispatch({ type: ACTION.SET_GIF_TO_NEXT, payload: state.currentGif })
            setLocation(`/gifs/${newCurrentGif.description}/${newCurrentGif.id}`)
            dispatch({ type: ACTION.SET_CURRENT_GIF, payload: newCurrentGif })
        }
    }

    const toNextGif = async (id: string,) => {
        let randomOffset = Math.ceil(Math.random() * 10) + 5
        let [randomCurrentGif] = await getRelatedGifs(id, 1, randomOffset)
        if (state.currentGif) {
            let newCurrentGif = state.gifHistory.nextGifs[0] || randomCurrentGif
            dispatch({ type: ACTION.SET_GIF_TO_PREV, payload: state.currentGif })
            setLocation(`/gifs/${newCurrentGif.description}/${newCurrentGif.id}`)
            dispatch({ type: ACTION.SET_CURRENT_GIF, payload: newCurrentGif })
        }
    }

    const handleSetNewGif = (gif: GifType) => {
        if (state.currentGif) dispatch({ type: ACTION.SET_GIF_TO_PREV, payload: state.currentGif })
        dispatch({ type: ACTION.SET_CURRENT_GIF, payload: gif })

    }

    return (
        <Context.Provider value={{ state, toPreviousGif, toNextGif, handleSetNewGif }}>
            {children}
        </Context.Provider>
    )
}

export default Context