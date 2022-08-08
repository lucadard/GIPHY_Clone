import React, { useContext, useEffect, useState } from 'react'

import GifsContext from '../context/GifsContext'
import HistoryContext from '../context/HistoryContext'
import { getGifById, getRelatedGifs } from '../services/getGifs'
import { ContextType, Gif, HistoryContextType } from '../types'
import GifList from '../components/GifList'

import '../styles/GifDetail.css'

type Props = {
    params: {
        searchTerm: string
        id: string
    }
}

const Detail = ({ params }: Props) => {
    const { gifs } = useContext<ContextType>(GifsContext)
    const { state, toPreviousGif, toNextGif } = useContext<HistoryContextType>(HistoryContext)
    const [gif, setGif] = useState<Gif>()
    const [showAllTags, setShowAllTags] = useState(false)
    const [fakeViewCount] = useState(Math.ceil(Math.random() * 2000000))

    useEffect(() => {
        const findGif = async () => {
            return gifs?.find(gif => gif.id === params.id)
                || (await getGifById(params.id))[0]
        }
        findGif().then(setGif)
        setShowAllTags(false)
        window.scrollTo(0, 0)
    }, [params.id])

    const handleShowAllTags = () => setShowAllTags(!showAllTags)

    return (
        <div className='gifDetails'>
            <div className='userInfo'>
                {gif?.user &&
                    <>
                        <div className='user'>
                            <div className="photo">
                                <img src={gif?.user.avatar_url} alt={`${gif?.user.tag} profile picture`} />
                            </div>
                            <p className="name">{gif?.user.name}</p>
                            <p className="tag"><span>@{gif?.user.tag}</span>{<span>✅</span>}</p>
                        </div>
                        <div className="description">
                            <p>{gif?.user.description}</p>
                        </div>
                        {gif.user.socials_url.facebook + gif.user.socials_url.instagram + gif.user.socials_url.twitter !== '' &&
                            <div className='socials'><p className='title'>Follow on:</p>
                                <div className="content">
                                    {gif.user.socials_url.facebook && <a target="_blank" href={gif.user.socials_url.facebook}>🅿️</a>}
                                    {gif.user.socials_url.instagram && <a target="_blank" href={gif?.user.socials_url.instagram}>📷</a>}
                                    {gif.user.socials_url.twitter && <a target="_blank" href={gif?.user.socials_url.twitter}>🦢</a>}
                                </div>
                            </div>
                        }
                    </>
                }
                {gif?.source &&
                    <div className='source'><p className='title'>Source</p>
                        <div className='content'>
                            <a href={gif?.source} target="_blank"><span>⤴️</span>{gif?.source}</a>
                        </div>
                    </div>
                }
            </div >
            <div style={{ display: 'flex', flexDirection: 'column', width: '774px', gap: '1rem' }}>
                <div className='gifInfo'>
                    <div className="gifPreview">
                        <p className='description'>{gif?.description}</p>
                        <img className='image' src={gif?.url} alt={gif?.description} key={gif?.description} />
                    </div>
                    <div className="gifNavigation">
                        <div className="navigator">
                            <div className={`previous ${state.gifHistory.prevGifs.length ? 'active' : ''}`}
                                onClick={() => toPreviousGif()}
                            >
                                {'<'}
                            </div>
                            <div className='next active'
                                onClick={() => toNextGif(gif?.id)}
                            >
                                {'>'}
                            </div>
                        </div>
                        <div className='actions'>
                            <div><span>🤍</span><p>Favorite</p></div>
                            <div><span>✈️</span><p>Share</p></div>
                            <div><span>{'<>'}</span><p>Embed</p></div>
                        </div>
                        <div className='views'>
                            <span>👁</span><p>{fakeViewCount} Views</p>
                        </div>
                    </div>
                </div>
                <div className="tagList">
                    {gif?.tags.map((tag, index) => {
                        if (!showAllTags && index > 4) return
                        else return <div className='detailTag' key={tag}><span>#{tag}</span></div>
                    })
                    }
                    {gif?.tags && gif?.tags.length > 4 &&
                        <div className="ellipsisTag" onClick={handleShowAllTags}>
                            <span>...</span>
                        </div>
                    }
                </div>
                <GifList params={params} type={'detail'} />
            </div>
        </div >
    )
}

export default Detail