import React, { useEffect, useState } from 'react'
import { Category } from '../utils/types/category'
import Image from 'next/image'

export default function RecipesCategories() {
    const [categories, setCategories] = useState<Category[]>([])

    const getCategories = async () => {
        const response = await fetch('http://themealdb.com/api/json/v1/1/categories.php')
        const data = await response.json()
        if (Array.isArray(data.categories)) setCategories(data.categories)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='flex gap-2 w-full flex-wrap'>
            {categories.map((category) => (
                <button className='px-6 py-1 bg-gray-200 rounded-md flex gap-1 text-gray-400 hover:text-gray-700 duration-300' key={category.idCategory}>
                    <div className='relative h-6 w-6'>
                        <Image
                            src={category.strCategoryThumb}
                            alt={category.strCategory}
                            layout='fill'
                            objectFit='cover'
                            className='rounded-full'
                        />
                    </div>{category.strCategory}</button>
            ))}
        </div>
    )
}
