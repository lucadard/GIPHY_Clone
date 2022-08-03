import React, { useContext, useEffect, useState } from 'react'

import GifsContext from '../context/GifsContext'
import { getGifById } from '../services/getGifs'
import { ContextType, Gif } from '../types'
import GifList from '../components/GifList'

import './GifDetail.css'

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
                        <div className='socials'><p className='title'>Follow on:</p>
                            <div className="content">
                                <a href={gif?.user.socials_url.facebook}>🅿️</a>
                                <a href={gif?.user.socials_url.instagram}>📷</a>
                                <a href={gif?.user.socials_url.twitter}>🦢</a>
                            </div>
                        </div>
                    </>
                }
                <div className='source'><p className='title'>Source</p>
                    <div className='content'>
                        <span>⤴️</span><a href=''>bit.ly/HBOMaxGiphy</a></div>
                </div>
            </div>
            <div>
                <div className='gifInfo'>
                    <div className="gifPreview">
                        <p className='description'>{gif?.description}</p>
                        <img className='image' src={gif?.url} alt={gif?.description} />
                    </div>
                    <div className="gifNavigation">
                        <div className="navigator">
                            <div className='previous'>{'<'}</div>
                            <div className='next active'>{'>'}</div>
                        </div>
                        <div className='actions'>
                            <div><span>🤍</span><p>Favorite</p></div>
                            <div><span>✈️</span><p>Share</p></div>
                            <div><span>{'<>'}</span><p>Embed</p></div>
                        </div>
                        <div className='views'>
                            <span>👁</span><p>{Math.ceil(Math.random() * 2000000)} Views</p>
                        </div>
                    </div>
                </div>
                <GifList params={params} type='detail' />
            </div>
        </div>
    )
}

export default Detail