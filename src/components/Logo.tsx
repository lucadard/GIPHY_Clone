import React from 'react'
import { Link } from 'wouter'

type Props = {}

const Logo = (props: Props) => {
    return (
        <Link to='/'>
            <h1 style={{ cursor: 'pointer' }}>LOGO</h1>
        </Link>
    )
}

export default Logo