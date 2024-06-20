import React from 'react'
import Layout from '@/app/components/layout/Layout'
import Recipes from '@/app/components/Recipes'
import RecipesCategories from '@/app/components/RecipesCategories'

export default function index() {
  return (
    <Layout>
      <div className='px-20 py-10'>Recipes

      <RecipesCategories />
      <Recipes />
      </div>
      
    </Layout>
  )
}
