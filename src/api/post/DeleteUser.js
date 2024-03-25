import axios from "axios";

import data from "../url.json";

const url = data.url;

export const delete_user = (userId) => {
  return _delete_user(userId);
};

const _delete_user = (userId) => {
  return new Promise((res, rej) => {
    axios
      .post(`${url}/users/delete`, {
        userId: userId,
      })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
