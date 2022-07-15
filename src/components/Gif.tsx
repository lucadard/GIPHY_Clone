import React, { createRef, useEffect, useState } from 'react'
import { Link } from 'wouter'
import useWindowWidth from '../hooks/useWindowWidth'

import { Gif as GifType } from '../types'

type Props = {
    id: GifType['id']
    url: GifType['url']
    description: GifType['description']
}

const Gif = ({ id, url, description }: Props) => {
    return (
        <Link to={`/gifs/${id}`}>
            <img
                style={{ cursor: 'pointer' }}
                className='gif' src={url} alt={`${description}`} />
        </Link>
    )
}

export default Gif