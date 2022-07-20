import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'wouter'
import GifsContext from '../context/GifsContext'

import { ContextType, Gif as GifType } from '../types'

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
    const { message, setMessage } = useContext<ContextType>(GifsContext)

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

    function handleCopyToClipboard() {
        // line below is to copy to user clipboard, it gives errors without using https
        navigator.clipboard.writeText(url);
        if (message.show) return
        setMessage({ text: 'Link copied to clipboard!', show: true });
        setTimeout(() => {
            setMessage({ text: '', show: false });
        }, 5000)
    };

    return (
        <div className='gif' style={styles}>
            <div className="gifActions">
                <span onClick={handleCopyToClipboard}>🔗</span>
                <span>🤍</span>
            </div>
            <Link to={`/gifs/${description}/${id}`}>
                <img src={url} alt={description} />
            </Link>
        </div>
    )
}

export default Gif