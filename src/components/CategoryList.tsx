import React, { useContext, useEffect, useState } from 'react'

import { CategoriesContextType, Category as CategoryType } from '../types'
import CategoriesContext from '../context/CategoriesContext'
import { useLocation } from 'wouter'
import Category from './Category'

type Props = {}

const CategoryList = ({ }: Props) => {
    const { categories } = useContext<CategoriesContextType>(CategoriesContext)
    const [subcategories, setSubcategories] = useState<{ name: string, data: Array<CategoryType> | undefined }>()
    const [location, setLocation] = useLocation()

    useEffect(() => {
        const sublocation = decodeURI(location.substring(location.indexOf('/', 2) + 1))
        setSubcategories({ name: sublocation, data: categories.find(category => category['name'] === sublocation)?.subcategories })
    }, [categories, location])

    const childCategories = () => {
        if (location === '/categories/all') return categories?.map(category => {
            return <div key={category.name}
                style={{ position: 'relative', cursor: 'pointer', borderRadius: '.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${category.gif?.images.original.url})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <a href={`/categories/${category.name}`} style={{ position: 'absolute', height: '100%', width: '100%' }}></a>
                <span style={{ textTransform: 'uppercase', color: 'white' }}>
                    {category.name}
                </span>
            </div>
        })
        else {
            return subcategories?.data?.map(category =>
                <Category key={category.name}
                    name={category.name} />
            )
        };
    }

    return (
        <div className='categoryResults'>
            <div className='category'>
                <h2>{subcategories?.name === 'all' ? 'categories' : subcategories?.name}</h2>
            </div>
            <div className='categoryContainer'
                style={{
                    gridTemplateColumns: 'repeat(3, 248px)',
                    gridAutoRows: '134px'
                }}>
                {childCategories()}
            </div>
        </div>
    )
}
export default CategoryList