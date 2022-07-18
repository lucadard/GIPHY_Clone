import React, { useEffect, useState } from 'react'
import { Link } from 'wouter'

import { Gif as GifType } from '../types'

type Props = {
    id: GifType['id']
    url: GifType['url']
    description: GifType['description']
    imageHeight: GifType['height']
    imageWidth: GifType['width']
    type: string
}

const Gif = ({ id, url, description, imageHeight, imageWidth, type = 'grid' }: Props) => {
    const [styles, setStyles] = useState<any>({
        backgroundImage: `url(${url})`,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    })
    useEffect(() => {
        type === 'grid'
            ? setStyles({ ...styles, gridRowEnd: `span ${calculateSpan()}` })
            : setStyles({ ...styles, height: '140px', width: `${calculateWidth()}px` })
    }, [])

    function calculateSpan(): number {
        //calculates new image height based on 414px width and calculates 
        //how many grid spaces should occupy based on 10px row + 10px gap
        return Math.ceil(248 * imageHeight / imageWidth / 20)
    }
    function calculateWidth(): number {
        //calculates new image width based on 200px height
        return 140 * imageWidth / imageHeight
    }

    return (
        <Link to={`/gifs/${description}/${id}`}>
            <div className='gif' style={styles}>
                <img src={url} alt={description} />
            </div>
        </Link>
    )
}

export default Gif