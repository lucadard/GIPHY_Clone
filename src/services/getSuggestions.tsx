import React from "react"

const API_KEY = '1pEskHbVQ22S4OFAPl78nMC7QF46bU8c'

export default async (term: string): Promise<Array<{ name: string }>> => {
    const res = await fetch(`https://api.giphy.com/v1/related/gif_id=${id}?api_key=${API_KEY}`)
    return (await res.json()).data
}
