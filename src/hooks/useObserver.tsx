import React, { useEffect, useRef, useState } from 'react'

type options = {
    root: null;
    rootMargin: string;
    threshold: number;
}

const useObserver = (options: options) => {
    const [target, setTarget] = useState<React.MutableRefObject<null>>()
    const [isNearTarget, setIsNearTarget] = useState(false)

    function cb(entries: IntersectionObserverEntry[]) {
        const [entry] = entries
        setIsNearTarget(entry.isIntersecting)
    }

    useEffect((): any => {
        if (!target) return

        const observer = new IntersectionObserver(cb, options)
        const currentTarget = target.current

        if (currentTarget) observer.observe(currentTarget)

        return () => currentTarget && observer.unobserve(currentTarget)
    }, [target, options])

    return {
        isNearTarget,
        setTarget
    }
}

export default useObserver