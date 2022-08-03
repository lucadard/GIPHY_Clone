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
    user?: GifType['user']
    tags: GifType['tags']
    source: GifType['source']
    handleCopyToClipboard: (url: string) => void
}

const Gif = ({ id, url, description, imageHeight, imageWidth, type = 'grid', handleCopyToClipboard, user, tags }: Props) => {
    const [styles, setStyles] = useState<any>({
        backgroundImage: `url(${url})`,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        gridRowEnd: type === 'grid' ? `span ${calculateSpan()}` : '',
        height: type === 'grid' ? '' : '140px',
        width: type === 'grid' ? '' : `${calculateWidth()}px`
    })

    // useEffect(() => {
    //     type === 'grid'
    //         ? setStyles({ ...styles, gridRowEnd: `span ${calculateSpan()}` })
    //         : setStyles({ ...styles, height: '140px', width: `${calculateWidth()}px` })
    // }, [])

    function calculateSpan(): number {
        //calculates new image height based on 414px width and calculates 
        //how many grid spaces should occupy based on 10px row + 15px gap
        return Math.ceil(248 * imageHeight / imageWidth / 25)
    }
    function calculateWidth(): number {
        //calculates new image width based on 200px height
        return 140 * imageWidth / imageHeight
    }

    return (
        <div className='gif' style={styles}>
            <div className="gifHover">
                <div className="gifActions">
                    <span onClick={() => handleCopyToClipboard(url)}>🔗</span>
                    <span>🤍</span>
                </div>

                {user ?
                    <div className="gifUser">
                        <div className="photo">
                            <img src={user?.avatar_url} alt={`${user?.name} photo`} />
                        </div>
                        {type !== 'carousel' && <div className="username"><span>{user?.name}</span></div>}
                    </div>
                    : type !== 'carousel' && <div className='gifTags'><p>{tags.map(tag => `#${tag} `)}</p></div>}
            </div>
            <Link to={`/gifs/${description}/${id}`}>
                <img src={url} alt={description} />
            </Link>
        </div>
    )
}

export default React.memo(Gif, (prev, next) => prev.id === next.id)