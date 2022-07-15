export type Gif = {
    id: string
    url: string
    description: string
}

export type GifsFromApi = Array<{
    id: string
    title: string
    images: {
        original: {
            url: string
        }
    }
}>

declare module "react-responsive-masonry" {
    function foo(): void;
    export = foo;
}