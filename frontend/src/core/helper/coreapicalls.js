import { API } from "../../backend";

//product
export const getProducts = (
  pageNumber = "1",
  categoryName = "",
  sortBy = "",
  sortByOrder = "",
  cakeCategory = "",
  cakeFlavor = ""
) => {
  return fetch(
    `${API}/products?categoryName=${categoryName}&sortBy=${sortBy}&sortByOrder=${sortByOrder}&cakeCategory=${cakeCategory}&cakeFlavor=${cakeFlavor}&pageNumber=${pageNumber}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getaProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
