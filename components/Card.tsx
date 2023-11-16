import { useRef, useState } from "react";

type CardProps = {
  setSearchResult: (value: string[]) => void;
};

type Meal = {
  strMealThumb: string;
  strMeal: string;
  [key: string]: string;
};

export default function Card({ setSearchResult }: CardProps) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const mealNameToSearch = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const mealToSearch = mealNameToSearch?.current?.value ?? "";
    getMeal(mealToSearch);
  };

  const getMeal = async (mealName: string) => {
    if (mealName === "") {
      setMeal(null);
      setSearchResult([]);
      return;
    }
    const mealSearch = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const mealData = await mealSearch.json();
    const searchResult = mealData.meals ? mealData.meals[0] : null;
    setMeal(searchResult);
    const ing = getIngredients(searchResult);
    setSearchResult(ing);
  };

  const getIngredients = (mealData: Meal): string[] => {
    console.log(mealData);
    if (mealData) {
      const ingredientsKeys = Array.from(Array(20).keys()).filter(
        (x) =>
          mealData[`strIngredient${x + 1}`] != "" &&
          mealData[`strIngredient${x + 1}`] != null
      );
      const ingredients = ingredientsKeys.map(
        (x) =>
          mealData[`strIngredient${x + 1}`] +
          ": " +
          mealData[`strMeasure${x + 1}`]
      );
      console.log(ingredients);
      return ingredients;
    } else return [];
  };

  return (
    <div>
      <div className="max-w-sm bg-slate-700 py-3 px-3 mb-1 w-full rounded">
        <div className="flex space-x-4">
          <div className="flex rounded-md overflow-hidden w-full">
            <input
              style={{ paddingLeft: "10px" }}
              ref={mealNameToSearch}
              type="text"
              className="w-full rounded-md"
            />
            <button
              onClick={handleClick}
              className="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {meal && (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src={meal?.strMealThumb}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{meal?.strMeal}</div>
            <p className="font-bold text-md mb-2">Ingredients</p>
            {getIngredients(meal).map((x, i) => (
              <p key={i} className="text-gray-700 text-base">
                {x}
              </p>
            ))}
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #favoritemeal
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #enjoyLife
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #food
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
