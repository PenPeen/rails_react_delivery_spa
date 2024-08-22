export const DEFAULT_RAILS_LOCALHOST = 'http://localhost:3000';
const DEFAULT_API_LOCALHOST = `${DEFAULT_RAILS_LOCALHOST}/api/v1`;
export const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants`;

export const foodsIndex = (restaurantId: string) => `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;
export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;
export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;
export const lineFoodsCount = `${DEFAULT_API_LOCALHOST}/line_foods/cart_count`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;

export const defaultRestaurantImage = `${DEFAULT_RAILS_LOCALHOST}/restaurant-default-image.jpg`;
