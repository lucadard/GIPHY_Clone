import React, { useEffect, useState } from 'react'
import getGifs from '../services/getGifs'

type Props = {
    name: string
}

const Category = ({ name }: Props) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        getGifs(name, 1, Math.floor(Math.random() * 5)).then(gif => setUrl(gif[0].url))
    }, [])

    return (
        <div style={{ position: 'relative', borderRadius: '.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url('${url}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <a href={`/search/${name}`} style={{ width: '100%', height: '100%', position: 'absolute' }}></a >
            <span style={{ textTransform: 'uppercase', color: 'white', textAlign: 'center' }}>
                {name}
            </span>
        </div>
    )
}

export default Category