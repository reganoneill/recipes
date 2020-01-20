import axios from "axios";
import { BASE_URL } from "../utils/connectApi";

export const signin = (user: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/signin`, user)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
