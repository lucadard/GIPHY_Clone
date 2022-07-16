import React, { useContext, useEffect, useRef, useState } from 'react'

import Gif from './Gif'
import { ContextType } from '../types'
import { useGifs } from '../hooks/useGifs'
import GifsContext from '../context/GifsContext'
import RelatedTerms from '../components/RelatedTerms'
import useObserver from '../hooks/useObserver'

type Props = {
    params: {
        searchTerm: string
    }
}

const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.3
}

const GifList = ({ params }: Props) => {
    // const [isScroll, setIsScroll] = useState(true)
    const { gifs, searchGifs, addGifs, loading, clearGifs } = useGifs()
    const { lastQuery } = useContext<ContextType>(GifsContext)
    const targetElement = useRef(null)
    const { isNearTarget, setTarget } = useObserver(observerOptions)

    useEffect(() => {
        setTarget(targetElement)
        if (decodeURI(params.searchTerm) === decodeURI(lastQuery)) return
        else clearGifs()
        searchGifs(params.searchTerm)
    }, [params.searchTerm])

    useEffect(() => { isNearTarget && handleLoadMore() }, [isNearTarget])

    const childGifs = () => {
        return gifs?.map(gif =>
            <Gif key={gif.id}
                id={gif.id}
                url={gif.url}
                description={gif.description}
                imageHeight={gif.height}
                imageWidth={gif.width} />
        );
    }

    function handleLoadMore() {
        addGifs(params.searchTerm, gifs.length)
    }

    return (
        <>
            <RelatedTerms searchTerm={params.searchTerm} type='suggestions' />
            <div className='gifContainer'>
                {loading ? <p style={{ textAlign: 'center' }}>loading...</p> : childGifs()}
            </div>
            <p ref={targetElement}>si ves esto, no hay mas gif... o algo esta mal</p>
        </>

    )
}
export default GifList