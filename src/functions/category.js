import axios from "axios";

// publicaly accessible route to get categories
export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);


// publically accessible route to get category by name
export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);



//delete category by name protected route via authtoken obtained from firebase.
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });


// update category by name protected route via authtoken obtained from firebase
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });


// create category protected route via authtoken obtained from firebase
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
  });

  
  // for getting sub category based on selected parent category from dropdown
  export const getCategorySubs = async (_id) => 
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
  
