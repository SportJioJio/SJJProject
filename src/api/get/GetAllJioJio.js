import axios from "axios";

import data from "../url.json";

const url = data.url;

export const get_all_jio_jio = () => {
  return _get_all_jio_jio();
};

const _get_all_jio_jio = () => {
  return new Promise((res, rej) => {
    axios
      .get(`${url}/posts`)
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
