import React from "react";
import Layout from "@/app/components/layout/Layout";
import Meals from "@/app/components/Meals";
import MealsCategories from "@/app/components/MealsCategories";

export default function index() {
  return (
    <Layout>
      <h3 className="font-bold text-xl text-red-600 my-4">Meals</h3>
      <MealsCategories />
      <br />
      <Meals />
    </Layout>
  );
}
