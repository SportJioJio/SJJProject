import axios from "axios";

import data from "../url.json";

const url = data.url;

export const create_user = (userId, userName, userProfilePictureUrl) => {
  return _create_user(userId, userName, userProfilePictureUrl);
};

const _create_user = (userId, userName, userProfilePictureUrl) => {
  console.log(userId, userName, userProfilePictureUrl);
  return new Promise((res, rej) => {
    axios
      .post(`${url}/users/create`, {
        userId: userId,
        userName: userName,
        userPicUrl: userProfilePictureUrl,
      })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
