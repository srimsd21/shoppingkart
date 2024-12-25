const baseurl = 'https://dummyjson.com/';

export const fetchProductCategories = async () => {
  try {
    const response = await fetch(`${baseurl}products/categories`);
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product categories:', error.message || error);
  }
};


export const fetchCategoriesSelect = async ({ cat }) => {
  try {
    const response = await fetch(`${baseurl}products/category/${cat}`);
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product categories:', error.message || error);
  }
};