export type Gif = {
    id: string
    url: string
    description: string
    height: number
    width: number
}

export type GifsFromApi = Array<{
    id: string
    title: string
    images: {
        original: {
            webp: string
            height: number
            width: number
        }
    }
}>

export type ContextType = {
    gifs: Array<Gif>
    setGifs: function
    lastQuery: string
    setLastQuery: function
}