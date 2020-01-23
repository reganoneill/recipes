import axios from "axios";
import { BASE_URL } from "../utils/connectApi";
import { IRecipe } from "../types/IRecipe";

export const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/api/recipe`)
      .then(recipes => {
        resolve(recipes.data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const createNewRecipe = (recipe: IRecipe) => {
  const token = collectToken();
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${BASE_URL}/api/recipe/auth`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: recipe
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteRecipe = (id: string) => {
  const token = collectToken();
  return new Promise((resolve, reject) => {
    axios({
      method: "DELETE",
      url: `${BASE_URL}/api/recipe/auth/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => {
      reject(err);
    });
  });
};

export const updateRecipe = (recipe: IRecipe) => {
  const token = collectToken();
  return new Promise((resolve, reject) => {
    axios({
      method: "PUT",
      url: `${BASE_URL}/api/recipe/auth/${recipe._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: recipe
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const collectToken = () => {
  const token = window.localStorage.getItem("recipeToken");
  if (typeof token === "string") {
    return JSON.parse(token);
  } else {
    return false;
  }
};
