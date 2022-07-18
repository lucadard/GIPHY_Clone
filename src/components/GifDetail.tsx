import React, { useContext, useEffect, useState } from 'react'

import GifsContext from '../context/GifsContext'
import { getGifById } from '../services/getGifs'
import { ContextType, Gif } from '../types'
import GifList from '../components/GifList'

type Props = {
    params: {
        searchTerm: string
        id: string
    }
}

const Detail = ({ params }: Props) => {
    const { gifs } = useContext<ContextType>(GifsContext)
    const [gif, setGif] = useState<Gif>()

    useEffect(() => {
        const findGif = async () => {
            return gifs?.find(gif => gif.id === params.id)
                || (await getGifById(params.id))[0]
        }
        findGif().then(setGif)
        window.scrollTo(0, 0)
    }, [params.id])

    return (
        <div className='gifDetails'>
            <div></div>
            <div>
                <p className='description'>{gif?.description}</p>
                <img className='gifPreview' src={gif?.url} alt={gif?.description} />
                <GifList params={params} type='detail' />
            </div>
        </div>
    )
}

export default Detail