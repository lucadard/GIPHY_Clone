import React, { useContext, useEffect, useState } from 'react'

import getCategories from '../services/getCategories'
import CategoryList from '../components/CategoryList'
import { CategoriesContextType } from '../types'
import CategoriesContext from '../context/CategoriesContext'
import { Helmet } from 'react-helmet'
import { useLocation } from 'wouter'

type Props = {}

const GifCategories = ({ }: Props) => {
    const { categories, setCategories } = useContext<CategoriesContextType>(CategoriesContext)
    const [location] = useLocation()
    const [currentCategory, setCurrentCategory] = useState('all')

    useEffect(() => {
        getCategories().then(setCategories)
        setCurrentCategory(location.substring(location.lastIndexOf('/') + 1))
    }, [])

    return (
        <div className='gifCategories'>
            <Helmet>
                <title>GIFs Categories - {currentCategory[0].toUpperCase() + currentCategory.substring(1)}</title>
            </Helmet>
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