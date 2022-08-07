import React, { useContext, useEffect, useRef, useState } from 'react'

import Gif from './Gif'
import { ContextType } from '../types'
import GifsContext from '../context/GifsContext'
import { useGifs } from '../hooks/useGifs'
import useObserver from '../hooks/useObserver'
import LoadingSpinner from './LoadingSpinner'

type Props = {
    params: {
        id: string
        searchTerm: string
    }
    type?: 'search' | 'detail'
}

const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.3
}

const GifList = ({ params, type = 'search' }: Props) => {
    const { gifs, searchGifs, addGifs, clearGifs, loading } = useGifs()
    const { lastQuery, handleCopyToClipboard } = useContext<ContextType>(GifsContext)
    const targetElement = useRef(null)
    const { isNearTarget, setTarget } = useObserver(observerOptions)

    useEffect(() => {
        setTarget(targetElement)
        if (decodeURI(params.searchTerm) === decodeURI(lastQuery) && type === 'search') return
        else clearGifs()
        searchGifs(params, type)
    }, [params.searchTerm])

    useEffect(() => { isNearTarget && handleLoadMore() }, [isNearTarget])

    const childGifs = () => {
        return gifs?.map(gif =>
            <Gif key={gif.id + Math.random() * 10}
                id={gif.id}
                url={gif.url}
                description={gif.description}
                imageHeight={gif.height}
                imageWidth={gif.width}
                user={gif.user}
                type='grid'
                tags={gif.tags}
                source={gif.source}
                handleCopyToClipboard={handleCopyToClipboard}
            />
        );
    }

    function handleLoadMore() {
        addGifs(params, gifs.length, type)
    }

    return (
        <div className='searchResults'>
            <div className='related'>
                {type === 'search'
                    ? <h2>{decodeURI(params.searchTerm)}
                        <span style={{ paddingLeft: '5px' }}>GIFs</span>
                    </h2>
                    : <span>Related GIFs</span>
                }
            </div>
            <div className='gifContainer'>
                {childGifs()}
            </div>
            <div style={{ alignSelf: 'center', marginTop: '3rem' }}>{loading && <LoadingSpinner />}</div>
            {<div ref={targetElement}></div>}
        </div>

    )
}
export default GifList