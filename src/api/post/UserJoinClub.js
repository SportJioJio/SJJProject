import axios from "axios";

import data from "../url.json";

const url = data.url;

export const user_join_club = (club_id, user_id) => {
  return _user_join_club(club_id, user_id);
};

const _user_join_club = (club_id, user_id) => {
  return new Promise((res, rej) => {
    axios
      .post(`${url}/users/join`, {
        groupId: club_id,
        userId: user_id,
      })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
