import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ListJioJio.css";
import PostItem from "../../components/PostItem";
import Pagination from "react-bootstrap/Pagination";
import { get_group_jio_jio_list } from "../../api/get/GetGroupInfo";
import { get_all_jio_jio } from "../../api/get/GetAllJioJio";
import moment from "moment";

function ListJioJio({ search, userId, userName, clubId, clubName }) {
  const pageCapacity = 5;
  const [load, setLoad] = useState(true);
  const [jioList, setJioList] = useState([]);
  const [active, setActive] = useState(1);
  const [pageIndexs, setPageIndexs] = useState([]);
  const update = () => {
    setLoad(true);
    if (clubId === userId) {
      get_all_jio_jio().then((getJioList) => {
        setJioList(getJioList);
        setLoad(false);
        console.log(getJioList);
      });
    } else {
      get_group_jio_jio_list(clubId).then((getJioList) => {
        setJioList(getJioList);
        setLoad(false);
        console.log(getJioList);
      });
    }
    // 等固定的clubId出來後，應該這樣寫
    // if(clubId == $'固定clubID') {
    //   get_user_jio_jio_list(userId).then(getJioList) => {
    //     setJioList(getJioList);
    //     setLoad(false);
    //     console.log(getJioList);
    //   }
    // }
    // else {
    //   get_group_jio_jio_list(clubId).then((getJioList) => {
    //     setJioList(getJioList);
    //     setLoad(false);
    //     console.log(getJioList);
    //   });
    // }
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    let items = [];
    for (let number = 1; number <= Math.ceil(jioList.length / pageCapacity); number++) {
      items.push(
        <Pagination.Item key={number} active={active === number} onClick={() => setActive(number)}>
          {number}
        </Pagination.Item>
      );
    }
    setPageIndexs(items);
  }, [active, jioList]);

  console.log("clubName");

  return (
    <div className="d-flex flex-column align-items-stretch align-items-sm-center p-5">
      {/* <h1>{userId}</h1>
      <img src={userProfilePictureUrl} alt="Profile" style={{ width: '20%', height: '20%' }} />
      <h1>{clubId}</h1> */}
      <h1>{`${clubName}`}</h1>
      <>
        {load ? (
          <Spinner animation="border" role="status" style={{ marginTop: "20vh" }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            {jioList
              .filter((item, index) => {
                return item.name.includes(search) || item.launcher_name.includes(search) || item.place.includes(search);
              })
              .filter((item, index) => {
                return index < pageCapacity * active && index >= pageCapacity * (active - 1);
              })
              .map((item, index) => {
                return (
                  <div className="mt-4 mx-3 mx-sm-0 w-sm-60">
                    <PostItem
                      postId={item.id}
                      index={index + 1}
                      id={item.id}
                      clubId={clubId}
                      clubName={"Dummy"}
                      userId={userId}
                      userName={userName}
                      title={item.name}
                      leaderId={item.launcher_id}
                      leaderName={item.launcher_name}
                      leaderPic={item.launcher_pic_url}
                      location={item.place}
                      startTime={moment(item.start_time).format("YYYY/MM/DD HH:mm")}
                      endTime={moment(item.end_time).format("YYYY/MM/DD HH:mm")}
                      participantsLimit={item.max_num}
                      participants={item.participant}
                      uploadTime={moment(item.create_ts).fromNow()}
                      update={update}
                    />
                  </div>
                );
              })}
          </>
        )}
      </>

      <div className="mt-3 d-flex justify-content-center">
        <Pagination>{pageIndexs}</Pagination>
      </div>
    </div>
  );
}

export default ListJioJio;
