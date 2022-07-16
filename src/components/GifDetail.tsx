import React, { useContext, useEffect, useState } from 'react'

import GifsContext from '../context/GifsContext'
import { getGifById } from '../services/getGifs'
import { ContextType, Gif } from '../types'

type Props = {
    params: {
        id: string
    }
}

const Detail = ({ params }: Props) => {
    const { gifs } = useContext<ContextType>(GifsContext)
    const [gif, setGif] = useState<Gif>()

    useEffect(() => {
        gifs.length ?
            setGif(gifs?.find(gif => gif.id === params.id)) :
            getGifById(params.id).then(data => setGif(data[0]))
    }, [])

    return (
        <div>
            <p>{gif?.description}</p>
            <img src={gif?.url} alt={gif?.description} />
        </div>
    )
}

export default Detail