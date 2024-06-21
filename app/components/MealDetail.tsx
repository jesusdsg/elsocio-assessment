import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Meal } from "../utils/types/meal";
import useStore from "../store";

interface MealDetailProps {
  id: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function MealDetail({ id, setVisible }: MealDetailProps) {
  const [details, setDetails] = useState<Meal>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const mealApi = useStore((state) => state.mealApi);

  const getDetails = async () => {
    try {
      const response = await fetch(`${mealApi}/lookup.php?i=${id}`);
      const data = await response.json();
      if (Array.isArray(data.meals)) setDetails(data.meals[0]);
      /* Format ingredients */
      const meal = data.meals[0];
      for (let i = 1; i < 20; i++) {
        const ingredient = `strIngredient` + i;
        const measure = `strMeasure` + i;
        if (meal[ingredient] != "" && meal[ingredient] != null)
          setIngredients((prevItems) => {
            const newArray = [...prevItems];
            newArray.push(meal[ingredient] + " : " + meal[measure]);
            return newArray;
          });
      }
    } catch (error) {
      alert("Error al obtener datos");
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] top-0 left-0 h-[200vh] bg-black/60 w-full">
      <div className="py-8 px-10 mt-10 m-auto w-[80vw] bg-white border rounded">
        <div
          className="cursor-pointer bg-gray-100 rounded hover:bg-orange-500 hover:text-white duration-300 absolute right-20 lg:right-[12rem]"
          onClick={() => setVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        {/* Body */}
        <h3 className="font-bold text-xl text-orange-600 my-4">
          {details?.strMeal}
        </h3>
        <div className="my-2 overflow-y-auto max-h-[60vh] lg:flex">
          <div className="lg:w-[40%]">
            <h3 className="font-bold text-base text-red-600 my-4">
              Ingredients:
            </h3>
            {ingredients.map((ingredient) => (
              <div className="text-sm" key={ingredient}>
                {ingredient}
              </div>
            ))}
          </div>
          <div className="lg:w-[60%]">
            <h3 className="font-bold text-base text-red-600 my-4">
              Instructions:
            </h3>
            <div className="text-sm">{details?.strInstructions}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
