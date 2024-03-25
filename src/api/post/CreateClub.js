import axios from "axios";

import data from "../url.json";

const url = data.url;

export const create_club = (clubId, clubName) => {
  console.log("create_club", clubId, clubName);
  return _create_club(clubId, clubName);
};

const _create_club = (clubId, clubName) => {
  return new Promise((res, rej) => {
    axios
      .post(`${url}/groups/create`, {
        groupId: clubId,
        groupName: clubName,
      })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
