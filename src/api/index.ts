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
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/api/recipe`, recipe)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteRecipe = (id: string) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}/api/recipe/${id}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const updateRecipe = (recipe: IRecipe) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASE_URL}/api/recipe/${recipe._id}`, recipe)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
