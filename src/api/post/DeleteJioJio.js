import axios from "axios";

import data from "../url.json";

const url = data.url;

export const delete_jio_jio = (posdId) => {
  return _delete_jio_jio(posdId);
};

const _delete_jio_jio = (postId) => {
  return new Promise((res, rej) => {
    axios
      .post(`${url}/posts/delete`, {
        postId: postId,
      })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
