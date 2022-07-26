import React, { useContext, useEffect, useRef, useState } from 'react'

import Gif from './Gif'
import { ContextType } from '../types'
import GifsContext from '../context/GifsContext'
import { useGifs } from '../hooks/useGifs'
import useObserver from '../hooks/useObserver'

type Props = {
    params: {
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
    const { gifs, searchGifs, addGifs, clearGifs } = useGifs()
    const { message, setMessage, lastQuery } = useContext<ContextType>(GifsContext)
    const targetElement = useRef(null)
    const { isNearTarget, setTarget } = useObserver(observerOptions)

    useEffect(() => {
        setTarget(targetElement)
        if (decodeURI(params.searchTerm) === decodeURI(lastQuery)) return
        else clearGifs()
        searchGifs(decodeURI(params.searchTerm))
    }, [params.searchTerm])

    useEffect(() => { isNearTarget && handleLoadMore() }, [isNearTarget])

    const childGifs = () => {
        return gifs?.map(gif =>
            <Gif key={gif.id}
                id={gif.id}
                url={gif.url}
                description={gif.description}
                imageHeight={gif.height}
                imageWidth={gif.width}
                type='grid'
                handleCopyToClipboard={handleCopyToClipboard} />
        );
    }

    function handleLoadMore() {
        addGifs(params.searchTerm, gifs.length)
    }

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
        <div className='searchResults'>
            <div className='related'>
                {type === 'search'
                    ? <h2>{decodeURI(params.searchTerm)}
                        <span style={{ paddingLeft: '5px' }}>GIFs</span>
                    </h2>
                    : <span>Related GIFs</span>
                }
            </div>
            <div className='gifContainer'
                style={{ gridTemplateColumns: `repeat(${type === 'search' ? 4 : 3}, 248px)` }}>
                {childGifs()}
            </div>
            <p ref={targetElement}>si ves esto, no hay mas gif... o algo esta mal</p>
        </div>

    )
}
export default GifList