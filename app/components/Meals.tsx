import React, { useEffect, useState } from "react";
import { Meal } from "../utils/types/meal";
import Image from "next/image";
import MealTags from "./MealTags";
import useStore from "../store";
import MealDetail from "./MealDetail";

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMealId, setCurrentMealId] = useState("");
  const selectedCategory = useStore((state) => state.selectedCategory);
  const mealQuery = useStore((state) => state.mealQuery);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const mealApi = useStore((state) => state.mealApi);
  /**
   * Get the meals
   */
  const getMeals = async () => {
    try {
      let response: Response | null = null;
      if (!selectedCategory || selectedCategory.idCategory == "0") {
        response = await fetch(`${mealApi}/search.php?f=b`);
      } else {
        response = await fetch(
          `${mealApi}/filter.php?c=${selectedCategory.strCategory}`
        );
      }
      if (mealQuery != "")
        response = await fetch(`${mealApi}/search.php?s=${mealQuery}`);
      const data = await response?.json();
      if (Array.isArray(data.meals)) {
        setMeals(data.meals);
        setTotalPages(Math.ceil(data.meals.length / 10));
      }
    } catch (error) {
      alert("Error al obtener datos");
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleMealDetail = (id: string) => {
    setCurrentMealId(id);
    setShowDetail(true);
  };

  /**
   *
   * @returns meals by page (10)
   */
  const renderMeals = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentMeals = meals.slice(startIndex, endIndex);

    return (
      <>
        {showDetail && (
          <MealDetail id={currentMealId} setVisible={setShowDetail} />
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full flex-wrap">
          {currentMeals.map((meal: Meal) => (
            <div
              key={meal.idMeal}
              className="rounded-md border border-gray-300 cursor-pointer"
              onClick={() => handleMealDetail(meal.idMeal)}
            >
              {/* Poster */}
              <div className="h-[25vh]">
                {meal.strMealThumb != "" && (
                  <div className="relative h-full">
                    <Image
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-md"
                    />
                  </div>
                )}
              </div>
              {/* Body of the card */}
              <div className="max-h-20 p-2">
                <h3 className="font-bold text-xs lg:text-base text-red-600 text-ellipsis truncate">
                  {meal.strMeal}
                </h3>
                <div className="flex items-center my-2 justify-between">
                  {/* Tags */}
                  <MealTags tags={meal.strTags} />
                  {/* Link */}
                  <a
                    href={meal.strYoutube || meal.strSource}
                    className="text-gray-400 hover:text-gray-500 duration-300"
                    target="_blank"
                    rel="noreferrer"
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
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  useEffect(() => {
    getMeals();
    console.log("Meal ", mealQuery);
  }, [selectedCategory, mealQuery]);

  return (
    <div>
      {renderMeals()}
      <div className="flex gap-10 my-10 text-sm">
        <button
          className="bg-gray-200 px-8 py-1 rounded hover:bg-gray-500 hover:text-white duration-300 cursor-pointer"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="bg-gray-200 px-8 py-1 rounded hover:bg-gray-500 hover:text-white duration-300 cursor-pointer"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
