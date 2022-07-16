import React, { useEffect, useState } from 'react'
import { Link } from 'wouter'

import getTrends from '../services/getTrendingTerms'
import getSuggestions from '../services/getSuggestions'

type Props = {
    searchTerm?: string
    type: string
}

const RelatedTerms = ({ searchTerm, type }: Props) => {
    const [relatedTerms, setRelatedTerms] = useState<Array<string>>([])

    useEffect(() => {
        if (type === 'trending')
            getTrends().then(setRelatedTerms)
        else if (type === 'suggestions' && searchTerm)
            getSuggestions(searchTerm).then(data => data.map(item => item.name)).then(setRelatedTerms)
    }, [searchTerm])

    return (
        <div className='relatedTerms'>
            {relatedTerms.map(item =>
                <Link to={`/search/${item}`}
                    key={item}>
                    <a>{item}</a>
                </Link>
            )}
        </div>
    )
}

export default RelatedTerms