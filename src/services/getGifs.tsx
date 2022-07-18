import { Gif, GifsFromApi } from "../types"

const API_KEY = '1pEskHbVQ22S4OFAPl78nMC7QF46bU8c'

const fetchGifs = async (query: string, limit: number, offset: number): Promise<GifsFromApi> => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}`)
    const data = (await res.json()).data
    // const retrieved = await data.reduce((acc: number, cur: GifsFromApi[0]) =>
    //     cur.images.original.webp && acc + 1, 0)
    // console.log(`retrieved ${retrieved} gif(s) from "api.giphy.com" query: '${query}'`);
    return data;
}

const fetchGifById = async (id: string) => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`)
    return [(await res.json()).data]
}

export const fetchTrendingGifs = async (limit = 15, offset = 0): Promise<GifsFromApi> => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`)
    const data = (await res.json()).data
    return data;
}

const mapApiToGifs = (apiGifs: GifsFromApi): Array<Gif> => {
    return apiGifs.map(apiGif => {
        return {
            id: apiGif.id,
            url: apiGif.images.original.webp,
            description: apiGif.title,
            height: apiGif.images.original.height,
            width: apiGif.images.original.width
        }
    })
}

export const getGifById = (id: string) => fetchGifById(id).then(mapApiToGifs)

export const getTrendingGifs = () => fetchTrendingGifs().then(mapApiToGifs)

export default (query: string, limit = 20, offset = 0) => fetchGifs(query, limit, offset).then(mapApiToGifs)
