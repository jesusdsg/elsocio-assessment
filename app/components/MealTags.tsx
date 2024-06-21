import React from 'react'

interface MealTagsProps {
    tags: string;
}
export default function MealTags({ tags }: MealTagsProps) {
    const splittedTags = tags?.split(',')
    return (
        <div className='flex flex-wrap gap-1 text-xs'>{splittedTags?.map(tag => (
            <div className='bg-gray-100 px-2 py-1 rounded-md text-gray-500' key={tag}>{tag}</div>
        ))}</div>
    )
}
