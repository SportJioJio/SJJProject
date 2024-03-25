import axios from "axios";

import data from "../url.json";

const url = data.url;

export const user_leave_group = (club_id, user_id) => {
  return _user_leave_group(club_id, user_id);
};

const _user_leave_group = (club_id, user_id) => {
  return new Promise((res, rej) => {
    axios
      .post(`${url}/users/leave`, {
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
