export type Gif = {
    id: string
    url: string
    description: string
    height: number
    width: number
    tags: string[]
    source: string
    user?: {
        name: string
        tag: string
        is_verified: boolean
        avatar_url: string
        description: string
        socials_url: {
            facebook: string
            instagram: string
            twitter: string
        }
    }
}

export type GifsFromApi = Array<{
    id: string
    title: string
    tags: string[]
    source: string
    images: {
        original: {
            webp: string
            height: number
            width: number
        }
    }
    user?: {
        avatar_url: string
        display_name: string
        username: string
        description: string
        facebook_url: string
        instagram_url: string
        twitter_url: string
        is_verified: boolean
    }
}>

export type ContextType = {
    gifs: Gif[]
    setGifs: function
    lastQuery: string
    setLastQuery: function
    message: {
        text: string
        show: boolean
    }
    setMessage: function
    handleCopyToClipboard: function
}

export type HistoryContextType = {
    gifHistory: {
        prevGifs: Gif[]
        nextGifs: Gif[]
    }
    handleSetNewGif: function
    toPreviousGif: function
    toNextGif: function
}

export type Category = {
    name: string
    gif?: { images: { original: { url: string } } }
    subcategories?: Array<{ name: string }>
}

export type CategoriesContextType = {
    categories: Array<Category>
    setCategories: function
}