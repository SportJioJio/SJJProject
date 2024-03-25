import axios from "axios";

import data from "../url.json";

const url = data.url;

export const delete_club = (clubId) => {
  return _delete_club(clubId);
};

const _delete_club = (clubId) => {
  return new Promise((res, rej) => {
    axios
      .post(`${url}/groups/delete`, {
        groupId: clubId,
      })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
