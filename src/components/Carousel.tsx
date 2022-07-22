import React, { useState, useEffect, useRef } from 'react'

import { getTrendingGifs } from '../services/getGifs'
import { Gif as GifType } from '../types'
import Gif from './Gif'

type Props = {
  type: string
}

const CAROUSEL_HEIGHT = 140;
const SCROLL_JUMP = 500;

const Carousel = ({ type }: Props) => {
  const [gifs, setGifs] = useState<GifType[]>([])
  const [showArrows, setShowArrows] = useState({ left: false, right: true })
  const sliderRef = useRef<any>(null)

  const childGifs = () => {
    return gifs.map(gif =>
      <Gif key={gif.id}
        id={gif.id}
        url={gif.url}
        description={gif.description}
        imageHeight={gif.height}
        imageWidth={gif.width}
        type='carousel' />
    );
  }

  useEffect(() => {
    getTrendingGifs().then(setGifs)
  }, [])

  const handleSlide = (direction: string) => {
    if (!sliderRef.current) return
    direction === 'right'
      ? sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + SCROLL_JUMP
      : sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - SCROLL_JUMP
  }

  const handleScrollDetect = (e: any) => {
    let scrollProgress = e.target.scrollLeft
    let endScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth
    setShowArrows({ left: scrollProgress > 0, right: scrollProgress + 10 < endScroll })
    console.log(scrollProgress > 0, scrollProgress + 10 < endScroll)
  }

  return (
    <div className='carousel'>
      <div className='carouselTitle' >
        <h3><span>📈</span>{type}</h3>
        <span style={{ cursor: 'pointer' }}>All the GIFs {'>'}</span>
      </div>
      <div
        className="carouselContainer"
        style={{ height: `${CAROUSEL_HEIGHT}px` }}>
        <div
          onClick={() => handleSlide('left')}
          className={`arrow left ${showArrows.left ? '' : 'hide'}`}>
          {'<'}
        </div>
        <div
          onScroll={handleScrollDetect}
          className='slider' ref={sliderRef}>
          {childGifs()}
        </div>
        <div
          onClick={() => handleSlide('right')}
          className={`arrow right ${showArrows.right ? '' : 'hide'}`}>
          {'>'}
        </div>
      </div>
    </div>
  )
}

export default Carousel

