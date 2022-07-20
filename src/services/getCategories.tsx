import React from "react"
import { Category } from "../types"

const API_KEY = '1pEskHbVQ22S4OFAPl78nMC7QF46bU8c'

export default async (): Promise<Array<Category>> => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${API_KEY}`)
    return (await res.json()).data
}