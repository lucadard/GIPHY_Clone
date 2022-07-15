import React, { useContext, useEffect, useState } from 'react'

import GifsContext from '../context/GifsContext'
import { getGifById } from '../services/getGifs'
import { Gif as GifType } from '../types'

type Props = {
    params: {
        id: string
    }
}

const Detail = ({ params }: Props) => {
    const { gifs } = useContext<any>(GifsContext)
    const [gif, setGif] = useState<any>({})

    useEffect(() => {
        gifs.length ?
            setGif(gifs.find(gif => gif.id === params.id)) :    //error de tipo
            getGifById(params.id).then(data => setGif(data[0]))
    }, [])

    return (
        <div>
            <p>{gif.description}</p>
            <img src={gif.url} alt={gif.description} />
        </div>
    )
}

export default Detail