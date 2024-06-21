import React, { useEffect, useState } from 'react'
import { Meal } from '../utils/types/meal'
import Image from 'next/image'
import MealTags from './MealTags'

export default function Meals() {
    const [meals, setMeals] = useState<Meal[]>([])
    const getRecipes = async () => {
        try {
            const response = await fetch('https://themealdb.com/api/json/v1/1/search.php?f=a')
            const data = await response.json()
            if (Array.isArray(data.meals)) setMeals(data.meals);
        } catch (error) {
            alert('Error al obtener datos')
        }
    }

    useEffect(() => {
        getRecipes()
    }, [])


    return (
        /* Card component */
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full flex-wrap'>
            {meals.map((meal: Meal) => (
                <div key={meal.idMeal} className='rounded-md border border-gray-300 cursor-pointer'>
                    {/* Poster */}
                    <div className='h-[25vh]'>
                        {meal.strMealThumb != '' && <div className='relative h-full'><Image
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            layout='fill'
                            objectFit='cover'
                            className='rounded-t-md'
                        /></div>}
                    </div>
                    {/* Body of the card */}
                    <div className="max-h-20 p-2">
                        <h3 className='font-bold text-xs lg:text-base text-red-600'>{meal.strMeal}</h3>
                        <div className='flex items-center my-2 justify-between'>
                            {/* Tags */}
                            <MealTags tags={meal.strTags} />
                            {/* Link */}
                            <a href={meal.strYoutube || meal.strSource} className='text-gray-400 hover:text-gray-500 duration-300' target='_blank' rel='noreferrer'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>

                            </a>
                        </div>



                    </div>
                </div>
            ))}
        </div>
    )
}
