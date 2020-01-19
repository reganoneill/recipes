import axios from "axios";
import { BASE_URL } from "../utils/connectApi";

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
