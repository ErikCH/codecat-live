"use client";

import { useState } from "react";
import { Schema } from "../../amplify/data/resource";

export default function Meal({
  mealName,
  onSubmit,
  onDelete,
  currentMeal,
}: {
  mealName: string;
  onSubmit: (formData: FormData) => void;
  onDelete: (id: string) => void;
  currentMeal: Schema["Meal"];
}) {
  const [calories, setCalories] = useState(currentMeal?.calories ?? 0);
  const [food, setFood] = useState(currentMeal?.food ?? "");

  function onDeleting() {
    console.log("deleting");
    onDelete(currentMeal.id);
    setCalories(0);
    setFood("");
  }

  return (
    <section className="w-1/2">
      <form
        action={onSubmit}
        className="flex flex-col border-2 p-5 rounded gap-4"
      >
        {currentMeal !== undefined ? (
          <div className="flex gap-4 justify-end items-center">
            <h4 className="text-red-500 text-lg ">Submitted</h4>
            <button
              className="p-2 text-white rounded-lg bg-red-500"
              type="button"
              onClick={() => onDeleting()}
            >
              Delete Entry
            </button>
          </div>
        ) : null}
        <input type="hidden" name="mealName" value={mealName.toUpperCase()} />
        <label htmlFor="mealInfo">{mealName}</label>
        <textarea
          disabled={currentMeal ? true : false}
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-3.5 disabled:bg-gray-100 disabled:text-gray-300"
          id="mealInfo"
          placeholder={`Enter ${mealName} info here`}
          name="mealInfo"
          onChange={(e) => setFood(e.target.value)}
          value={food}
        />
        <label htmlFor="calMealName">Estimated Calories</label>
        <input
          disabled={currentMeal ? true : false}
          type="number"
          className="p-4 bg-gray-100 border border-gray-300 text-gray-900 text-md rounded-lg p-2.5 disabled:bg-gray-100 disabled:text-gray-300"
          placeholder="enter calories"
          name="calMealName"
          id="calMealName"
          onChange={(e) => setCalories(parseInt(e.target.value))}
          value={calories}
        />
        <button
          disabled={currentMeal ? true : false}
          className="bg-green-300 p-4 rounded-lg w-1/2 m-auto disabled:bg-gray-100   disabled:text-gray-300"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
