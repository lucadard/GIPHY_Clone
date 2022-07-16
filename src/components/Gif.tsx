import React, { useEffect, useState } from 'react'
import { Link } from 'wouter'

import { Gif as GifType } from '../types'

type Props = {
    id: GifType['id']
    url: GifType['url']
    description: GifType['description']
    imageHeight: GifType['height']
    imageWidth: GifType['width']
}

const Gif = ({ id, url, imageHeight, imageWidth }: Props) => {
    const [span, setSpan] = useState<number>(0)

    useEffect(() => {
        setSpan(calculateSpan())
    }, [])

    function calculateSpan(): number {
        //calculates new image height based on 414px width and calculates 
        //how many grid spaces should occupy based on 10px row + 10px gap
        return Math.ceil(414 * imageHeight / imageWidth / 20)
    }

    return (
        <Link to={`/gifs/${id}`}>
            <a style={{ gridRowEnd: `span ${span}`, backgroundImage: `url(${url})` }}
                className='gif' />
        </Link>
    )
}

export default Gif