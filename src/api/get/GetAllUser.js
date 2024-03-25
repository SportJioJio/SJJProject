import axios from "axios";

import data from "../url.json";

const url = data.url;

export const get_all_user = () => {
  return _get_all_user();
};

const _get_all_user = () => {
  return new Promise((res, rej) => {
    axios
      .get(`${url}/users`)
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
