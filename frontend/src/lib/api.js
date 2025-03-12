const BASE_URL = "http://localhost:8082/api/dishes";

const dishesData = [];
export async function getAllDishes(page = 1, limit = 10) {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
    const data = await response.json();
    dishesData.push(...data.dishes);

    if (!data.success) {
      throw new Error("Failed to fetch dishes");
    }

    return data.dishes;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
}

export async function getDishById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to fetch dish");
    }

    return data.dish || null;
  } catch (error) {
    console.error("Error fetching dish:", error);
    return null;
  }
}

export async function searchDishes(query) {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${query}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to search dishes");
    }

    return data.dishes;
  } catch (error) {
    console.error("Error searching dishes:", error);
    return [];
  }
}

export async function getFilterOptions() {
  try {
    const response = await fetch(`${BASE_URL}/filters`);
    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to fetch filter options");
    }

    return data.filters;
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return [];
  }
}

export async function getDishesByIngredients(ingredients) {
  try {
    const response = await fetch(`${BASE_URL}/by-ingredients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to fetch dishes by ingredients");
    }

    return data.dishes;
  } catch (error) {
    console.error("Error fetching dishes by ingredients:", error);
    return [];
  }
}

export async function getAllIngredients() {
  const allIngredients = dishesData.flatMap((dish) => dish.ingredients.map((i) => i.trim()))
  return [...new Set(allIngredients)].sort()
}

export async function getSuggestedDishes(ingredients) {
  return dishesData.filter((dish) => {
    const dishIngredients = dish.ingredients.map((i) => i.trim().toLowerCase());
    return ingredients.some((ingredient) => 
      dishIngredients.includes(ingredient.trim().toLowerCase())
    );
  });
}