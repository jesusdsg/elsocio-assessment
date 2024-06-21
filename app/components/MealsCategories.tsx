import React, { useEffect, useState } from "react";
import { Category } from "../utils/types/category";
import Image from "next/image";
import useStore from "../store";

export default function MealsCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const selectCategory = useStore((state) => state.selectCategory);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setMealQuery = useStore((state) => state.setMealQuery);

  /**
   * Insert the all category object
   */
  const setAllCategory = () => {
    const newCategory: Category = {
      idCategory: "0",
      strCategory: "All",
      strCategoryDescription: "Todas las categorias",
      strCategoryThumb: "",
    };
    const exists = categories.find(
      (category) => category.idCategory == newCategory.idCategory
    );
    if (!exists)
      setCategories((prevCategories) => {
        const newCategories = [...prevCategories];
        newCategories.unshift(newCategory); // Inserta newCategory al principio del array
        return newCategories;
      });
  };
  setAllCategory();

  const handleQueryChange = (event: any) => {
    if (event.key == "Enter") setMealQuery(event.target.value);
  };

  /**
   * Get the categories Data
   */
  const getCategories = async () => {
    try {
      const response = await fetch(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      if (Array.isArray(data.categories)) setCategories(data.categories);
    } catch (error) {
      alert("Error al obtener datos");
    }
  };

  useEffect(() => {
    getCategories();
  }, [selectedCategory]);

  return (
    <>
      {/* Search for name, use enter to make de query search */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-100 px-2 py-1 rounded absolute top-[10vh] lg:top-[20vh] right-10 md:right-20 lg:right-[6vw] border"
        onKeyUp={(e) => handleQueryChange(e)}
      />
      {/* Categories */}
      <div className="grid grid-cols-2 md:flex lg:flex gap-2 w-full flex-wrap">
        {categories.map((category) => (
          <button
            className={`px-6 py-1 rounded-md text-xs lg:text-sm flex gap-1 hover:text-gray-700 duration-300 items-center ${
              selectedCategory?.idCategory == category.idCategory
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-500"
            } `}
            key={category.idCategory}
            onClick={() => selectCategory(category)}
          >
            {category.strCategoryThumb != "" && (
              <div className="relative h-6 w-6">
                <Image
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            )}
            {category.strCategory}
          </button>
        ))}
      </div>
    </>
  );
}
