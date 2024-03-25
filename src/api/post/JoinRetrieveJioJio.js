import axios from "axios";

import data from "../url.json";

const url = data.url;

export const join_retrieve_jio_jio = (club_name, group_name, user_name, move) => {
  return _join_retrieve_jio_jio(club_name, group_name, user_name, move);
};

const _join_retrieve_jio_jio = (postId, userId, move) => {
  return new Promise((res, rej) => {
    axios
      .post(`${url}/posts/${move === "+1" ? "join" : "leave"}`, {
        postId: postId,
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
