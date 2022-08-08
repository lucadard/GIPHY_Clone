import React, { useContext, useState } from 'react'
import { Link } from 'wouter'

import HistoryContext from '../context/HistoryContext'
import GifsContext from '../context/GifsContext'

import { ContextType, HistoryContextType, Gif as GifType } from '../types'

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

const Gif = (props: Props) => {
    const { handleSetNewGif } = useContext<HistoryContextType>(HistoryContext)
    const { handleCopyToClipboard } = useContext<ContextType>(GifsContext)
    const [styles] = useState<any>({
        backgroundImage: `url(${props.url})`,
        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        gridRowEnd: props.type === 'grid' ? `span ${calculateSpan()}` : '',
        height: props.type === 'grid' ? '' : '140px',
        width: props.type === 'grid' ? '' : `${calculateWidth()}px`
    })

    function calculateSpan(): number {
        //calculates new image height based on 414px width and calculates 
        //how many grid spaces should occupy based on 10px row + 15px gap
        return Math.ceil(248 * props.imageHeight / props.imageWidth / 25)
    }
    function calculateWidth(): number {
        //calculates new image width based on 200px height
        return 140 * props.imageWidth / props.imageHeight
    }

    return (
        <div className='gif' style={styles}>
            <div className="gifHover">
                <div className="gifActions">
                    <span onClick={() => handleCopyToClipboard(props.url)}>🔗</span>
                    <span>🤍</span>
                </div>

                {props.user ?
                    <div className="gifUser">
                        <div className="photo">
                            <img src={props.user?.avatar_url} alt={`${props.user?.name} photo`} />
                        </div>
                        {props.type !== 'carousel' && <div className="username"><span>{props.user?.name}</span></div>}
                    </div>
                    : props.type !== 'carousel' && <div className='gifTags'><p>{props.tags.map(tag => `#${tag} `)}</p></div>}
            </div>
            <Link to={`/gifs/${props.description}/${props.id}`}
                onClick={() => handleSetNewGif(props)}
            >
                <img src={props.url} alt={props.description} />
            </Link>
        </div>
    )
}

export default React.memo(Gif, (prev, next) => prev.id === next.id)