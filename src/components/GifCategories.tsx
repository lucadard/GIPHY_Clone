import React, { useContext, useEffect } from 'react'

import getCategories from '../services/getCategories'
import CategoryList from '../components/CategoryList'
import { CategoriesContextType } from '../types'
import CategoriesContext from '../context/CategoriesContext'

type Props = {}

const GifCategories = ({ }: Props) => {
    const { categories, setCategories } = useContext<CategoriesContextType>(CategoriesContext)

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    return (
        <div className='gifCategories'>
            <div className='categoriesColumn'>
                <h5>CATEGORIES</h5>
                <div className="categoriesList">
                    {categories.map(category =>
                        <span key={category.name}>
                            <a href={`/categories/${category.name}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {category.name}
                            </a>
                        </span>
                    )}
                </div>
            </div>
            <div className='categoriesPreview'>
                <CategoryList />
            </div>
        </div >
    )
}

export default GifCategories