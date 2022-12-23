import axios from "axios";

// publicaly accessible route to get categories
export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);
// publically accessible route to get category by name
export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
//delete category by name protected route via authtoken obtained from firebase.
export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });
// update category by name protected route via authtoken obtained from firebase
export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });
// create category protected route via authtoken obtained from firebase
export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
