import axios from "axios";

import data from "../url.json";

const url = data.url;

export const launch_jio_jio = (jio) => {
  return _launch_jio_jio(jio);
};

const _launch_jio_jio = (jio) => {
  return new Promise((res, rej) => {
    // console.log(jio.start, jio.end)
    const item = {
      userId: jio.userId,
      groupId: jio.groupId,
      name: jio.activity,
      startTime: jio.start.utc().format("YYYY-MM-DD HH:mm:ss"),
      endTime: jio.end.utc().format("YYYY-MM-DD HH:mm:ss"),
      maxNum: jio.person,
      place: jio.place,
    };
    console.log(item);
    axios
      .post(`${url}/posts/create`, {
        ...item,
      })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
