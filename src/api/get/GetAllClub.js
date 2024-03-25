import axios from "axios";

import data from "../url.json";

const url = data.url;

export const get_all_club = () => {
  return _get_all_club();
};

const _get_all_club = () => {
  return new Promise((res, rej) => {
    axios
      .get(`${url}/groups`)
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
