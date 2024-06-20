import React, { useEffect, useState } from 'react'
import { Category } from '../utils/types/category'
import Image from 'next/image'
import useStore from '../store'

export default function RecipesCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const selectCategory = useStore((state) => state.selectCategory)
    const selectedCategory = useStore((state) => state.selectedCategory)

    /**
     * Insert the all category object
     */
    const setAllCategory = () => {
        const newCategory: Category = {
            idCategory: '0', strCategory: 'Todas', strCategoryDescription: 'Todas las categorias', strCategoryThumb: ''
        }
        const exists = categories.find(category => category.idCategory == newCategory.idCategory)
        if (!exists)
            setCategories(prevCategories => {
                const newCategories = [...prevCategories];
                newCategories.unshift(newCategory); // Inserta newCategory al principio del array
                return newCategories;
            });
    }
    setAllCategory()

    /**
     * Get the categories Data
     */
    const getCategories = async () => {
        try {
            const response = await fetch('https://themealdb.com/api/json/v1/1/categories.php')
            const data = await response.json()
            if (Array.isArray(data.categories)) setCategories(data.categories);
        } catch (error) {
            alert('Error al obtener datos')
        }
    }


    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='flex gap-2 w-full flex-wrap'>
            {categories.map((category) => (
                <button className={`px-6 py-1 bg-gray-200 rounded-md flex gap-1 text-gray-400 hover:text-gray-700 duration-300 ${selectedCategory?.idCategory == category.idCategory && 'bg-orange-500 text-white'} `} key={category.idCategory} onClick={() => selectCategory(category)}>
                    <div className='relative h-6 w-6'>
                        {category.strCategoryThumb != '' && <Image
                            src={category.strCategoryThumb}
                            alt={category.strCategory}
                            layout='fill'
                            objectFit='cover'
                            className='rounded-full'
                        />}

                    </div>{category.strCategory}</button>
            ))}
        </div>
    )
}
