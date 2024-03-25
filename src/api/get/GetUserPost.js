import axios from "axios";

import data from "../url.json";

const url = data.url;

export const get_user_jio_jio_list = (userId) => {
  return _get_user_jio_jio_list(userId);
};

const _get_user_jio_jio_list = (userId) => {
  return new Promise((res, rej) => {
    axios
      .get(`${url}/posts/userid/${userId}`)
      .then((response) => {
        if (response.data.status === "fail") {
          res([]);
        }
        res(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
