import { Gif, GifsFromApi } from "../types"

const API_KEY = 'Gc7131jiJuvI7IdN0HZ1D7nh0ow5BU6g'

const fetchGifs = async (query: string, limit: number, offset: number): Promise<GifsFromApi> => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}`)
    const data = (await res.json()).data
    return data;
}

const fetchGifById = async (id: string) => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`)
    return [(await res.json()).data]
}

export const fetchTrendingGifs = async (limit = 15, offset = 0): Promise<GifsFromApi> => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`)
    return (await res.json()).data
}

export const fetchRelatedGifs = async (id: string, limit = 15, offset = 0): Promise<GifsFromApi> => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/related?gif_id=${id}&api_key=${API_KEY}&limit=${limit}&offset=${offset}`)
    return (await res.json()).data
}


const mapApiToGifs = (apiGifs: GifsFromApi): Array<Gif> => {
    return apiGifs.map(apiGif => {
        const obj = {
            id: apiGif.id,
            url: apiGif.images.original.webp,
            description: apiGif.title,
            height: apiGif.images.original.height,
            width: apiGif.images.original.width,
            tags: apiGif.tags
        }
        return apiGif.user ? {
            ...obj, user: {
                name: apiGif.user.display_name,
                tag: apiGif.user.username,
                is_verified: apiGif.user.is_verified,
                avatar_url: apiGif.user.avatar_url,
                description: apiGif.user.description,
                socials_url: {
                    facebook: apiGif.user.facebook_url,
                    instagram: apiGif.user.instagram_url,
                    twitter: apiGif.user.twitter_url
                }
            }
        } : obj
    })
}

export const getGifById = (id: string) => fetchGifById(id).then(mapApiToGifs)

export const getTrendingGifs = () => fetchTrendingGifs().then(mapApiToGifs)

export const getRelatedGifs = (id: string, limit = 20, offset = 0) => fetchRelatedGifs(id, limit, offset).then(mapApiToGifs)

export default (query: string, limit = 20, offset = 0) => fetchGifs(query, limit, offset).then(mapApiToGifs)
