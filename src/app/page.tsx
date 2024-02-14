import Meal from "@/components/Meal";
import { cookieBasedClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const onSubmit = async (formData: FormData) => {
    "use server";
    const { data } = await cookieBasedClient.models.Meal.create({
      calories: Number(formData.get("calories")),
      food: formData.get("mealInfo")?.toString() as string,
      date: new Date().toISOString().split("T")[0],
      mealName: formData.get("mealName")?.toString() as
        | "BREAKFAST"
        | "LUNCH"
        | "DINNER"
        | "SNACK",
    });
    console.log("data", data);
  };

  const onDelete = async (id: string) => {
    "use server";
    const { data } = await cookieBasedClient.models.Meal.delete({
      id,
    });
    console.log("data", data);
    revalidatePath("/");
  };

  const { data: currentMeal } = await cookieBasedClient.models.Meal.list({
    filter: {
      date: {
        // YYYY-MM-DD
        eq: new Date().toISOString().split("T")[0],
      },
    },
  });

  console.log("currentMeal", currentMeal);

  return (
    <main className="flex flex-col items-center p-4 gap-6 w-full">
      <h1 className="text-2xl bg-yellow-200 rounded p-4">
        My Super Amazing Meal Plan App
      </h1>
      <h2 className="text-lg italic">Date: {new Date().toDateString()}</h2>
      <Meal
        mealName="Breakfast"
        onSubmit={onSubmit}
        currentMeal={currentMeal.find((meal) => meal.mealName === "BREAKFAST")!}
        onDelete={onDelete}
      />
      <Meal
        currentMeal={currentMeal.find((meal) => meal.mealName === "LUNCH")!}
        onSubmit={onSubmit}
        mealName="Lunch"
        onDelete={onDelete}
      />
      <Meal
        currentMeal={currentMeal.find((meal) => meal.mealName === "DINNER")!}
        onSubmit={onSubmit}
        mealName="Dinner"
        onDelete={onDelete}
      />
    </main>
  );
}
