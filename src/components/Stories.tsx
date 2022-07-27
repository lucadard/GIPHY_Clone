import React, { useEffect, useState } from 'react'
import getGifs from '../services/getGifs'
import { Gif as GifType } from '../types'

import './Stories.css'
import Story from './Story'

type Props = {}

const Stories = (props: Props) => {
    const [gifs, setGifs] = useState<GifType[]>()
    useEffect(() => {
        getGifs('trending', 30).then(setGifs)
    }, [])

    return (
        <div className="stories">
            <div className="storiesTitle">
                <h3><span>📺</span>Stories</h3>
            </div>
            <div className='storiesContainer'>
                {
                    gifs?.map((gif, index) => <Story
                        key={gif.description}
                        url={gif.url}
                        title={gif.description}
                        userPhotoUrl={`https://randomuser.me/api/portraits/lego/${Math.ceil(Math.random() * 9)}.jpg`}
                        time={Math.ceil(Math.random() * 11)}
                        imageWidth={gif.width}
                        index={index}
                    />)
                }
            </div>
        </div>
    )
}

export default Stories