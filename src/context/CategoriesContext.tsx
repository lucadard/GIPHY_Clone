import React, { useState, createContext, useEffect } from 'react'

import { CategoriesContextType, Category } from '../types'

const Context = createContext<CategoriesContextType>({
    categories: [],
    setCategories: () => null
})

type Props = {
    children: any
}

export function CategoriesContextProvider({ children }: Props) {
    const [categories, setCategories] = useState<Array<Category>>([])
    return (
        <Context.Provider value={{ categories, setCategories }}>
            {children}
        </Context.Provider>
    )
}

export default Context