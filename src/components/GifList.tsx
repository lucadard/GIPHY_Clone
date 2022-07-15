import React, { ComponentType, FunctionComponent, useContext, useEffect } from 'react'
import Masonry from 'react-masonry-component';
import InfiniteScroll from 'react-infinite-scroll-component';

import Gif from './Gif'
import { Gif as GifType } from '../types'
import { useGifs } from '../hooks/useGifs'
import useWindowWidth from '../hooks/useWindowWidth'
import GifsContext from '../context/GifsContext'

type Props = {
    params: {
        searchTerm: string
    }
}

const masonryOptions = {
    fitWidth: true,
    columnWidth: 350,
    gutter: 15,
    itemSelector: ".photo-item",
};


const imagesLoadedOptions = { background: '.my-bg-image-el' }

const GifList = ({ params }: Props) => {
    const { gifs, searchGifs, addGifs } = useGifs()
    // const windowWidth = useWindowWidth()
    const { lastQuery } = useContext<any>(GifsContext)

    useEffect(() => {
        console.log(lastQuery)
        if (params.searchTerm === lastQuery) return
        else searchGifs(params.searchTerm)
    }, [params.searchTerm])

    const childGifs = () => gifs?.map(gif => // error de tipos
        <li className={`photo-item`} key={gif.id}>
            <Gif
                id={gif.id}
                url={gif.url}
                description={gif.description} />
        </li>
    )

    const handleLoadMore = () => addGifs(params.searchTerm, gifs.length)

    return (
        <InfiniteScroll
            dataLength={gifs.length} //This is important field to render the next data
            next={handleLoadMore}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
        >
            <div style={{ width: '90vw' }}>
                <Masonry // no tengo idea como solucionar este error
                    className={"photo-list"}
                    elementType={"ul"}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                >
                    {childGifs()}
                </Masonry>
            </div>
        </InfiniteScroll >
    )
}
export default GifList