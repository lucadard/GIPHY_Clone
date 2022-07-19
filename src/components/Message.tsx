import React, { useContext } from 'react'
import GifsContext from '../context/GifsContext'
import { ContextType } from '../types'

const Message = () => {
    const { message } = useContext<ContextType>(GifsContext)

    return (
        <div className={`message ${message.show ? 'show' : ''}`}>
            <p>
                {message.text}
            </p>
        </div>
    )
}

export default Message