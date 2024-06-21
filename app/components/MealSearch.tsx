import React from "react";
import useStore from "../store";

export default function MealSearch() {
  const setMealQuery = useStore((state) => state.setMealQuery);
  const handleQueryChange = (event: any) => {
    if (event.key == "Enter") setMealQuery(event.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Search..."
      className="bg-gray-100 px-2 py-1 rounded absolute top-[10vh] lg:top-[20vh] right-10 md:right-20 lg:right-[6vw] border"
      onKeyUp={(e) => handleQueryChange(e)}
    />
  );
}
