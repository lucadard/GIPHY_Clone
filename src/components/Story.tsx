import React, { useState } from 'react'

type Props = {
    url: string
    title: string
    userPhotoUrl: string
    time: number
    imageWidth: number
    index: number
}

const Story = ({ url, title, userPhotoUrl, time, imageWidth, index }: Props) => {
    const [backgroundColor, setBackgroundColor] = useState(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    return (
        <div className={`story 
        ${index === 0 // the worst way to do this...
                || index === 5
                || index === 11
                || index === 17
                || index === 24
                || index === 29
                ? 'large'
                : 'small'}`}>
            <div className="imgContainer" style={{ backgroundColor }}>
                <img src={url} alt={`${title} story`} />
            </div>
            <div className="dataContainer">
                <div className="dataImg">
                    <img src={userPhotoUrl} alt={`${title} user photo`} />
                </div>
                <div className='dataText'>
                    <p className='dataTitle'>{title}</p>
                    <p className='dataTime'>{`${time}h ago`}</p>
                </div>
            </div>
            <div className='gradient' style={{ background: `linear-gradient(0deg, ${backgroundColor} 10%, rgba(0,0,0,0) 40%)` }}></div>
            <div className="cascade1" style={{ backgroundColor }}></div>
            <div className="cascade2" style={{ backgroundColor, opacity: '.8' }}></div>
            <div className="cascade3" style={{ backgroundColor, opacity: '.6' }}></div>
        </div >
    )
}

export default Story