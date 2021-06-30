import { API } from "../../backend";

//product
export const getProducts = (
  pageNumber = "1",
  categoryName = "",
  sortBy = "",
  sortByOrder = ""
) => {
  return fetch(
    `${API}/products?categoryName=${categoryName}&sortBy=${sortBy}&sortByOrder=${sortByOrder}&pageNumber=${pageNumber}`,
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

//contact
export const getContact = () => {
  return fetch(`${API}/contact/603983c4cc11373eace13f6e`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get carousel images
export const getCarousel = () => {
  return fetch(`${API}/carousel`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
