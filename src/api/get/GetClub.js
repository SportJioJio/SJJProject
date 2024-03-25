import axios from "axios";

import data from "../url.json";

const url = data.url;

export const get_club = (club_id) => {
  return _get_club(club_id);
};

const _get_club = (club_id) => {
  return new Promise((res, rej) => {
    axios
      .get(`${url}/groups/groupid/${club_id}`)
      .then((response) => {
        if (response.data.status === "fail") {
          res("NaN");
        }
        console.log(response.data.result);
        res(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
