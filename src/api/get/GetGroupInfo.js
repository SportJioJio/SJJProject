import axios from "axios";

import data from "../url.json";

const url = data.url;

export const get_group_jio_jio_list = (club_id) => {
  return _get_group_jio_jio_list(club_id);
};

const _get_group_jio_jio_list = (club_id) => {
  return new Promise((res, rej) => {
    axios
      .get(`${url}/posts/groupid/${club_id}`)
      .then((response) => {
        // console.log(response.data.group_list)
        // console.log(response.data.result[0])
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

// export const get_group_name = (groupId) => {
//   return _get_group_name();
// };

// const _get_group_name = () => {
//   // return new Promise((res, rej) => {
//   //     axios.post('').then((response) => {
//   //         const result = response
//   //         res(result)
//   //     })
//   // })

//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res(groupName);
//     });
//   });
// };
