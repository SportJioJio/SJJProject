import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import "bootstrap/dist/css/bootstrap.min.css";

import ParticipantsList from "./ParticipantsList";
import { join_retrieve_jio_jio } from "../api/post/JoinRetrieveJioJio";
import { delete_jio_jio } from "../api/post/DeleteJioJio.js";

function PostItem({
  postId,
  userId,
  title,
  leaderId,
  leaderName,
  leaderPic,
  location,
  startTime,
  endTime,
  participantsLimit,
  participants,
  uploadTime,
  update,
}) {
  const onClickJoin = () => {
    join_retrieve_jio_jio(postId, userId, "+1").then((result) => {
      console.log(result);
      update();
    });
  };

  const onClickRetrieve = () => {
    join_retrieve_jio_jio(postId, userId, "-1").then((result) => {
      console.log(result);
      update();
    });
  };

  const onClickDelete = () => {
    delete_jio_jio(postId).then((result) => {
      console.log(result);
      update();
    });
  };

  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <div className="d-flex justify-content-center my-3">
          {/* <span style={{fontSize: 'larger'}}>{title}</span> */}
          <Card.Title>{title}</Card.Title>
        </div>
        <div className="d-flex flex-column flex-lg-row">
          <div className="d-flex flex-column align-items-center">
            <Image src={leaderPic} height={"150px"} width={"150px"} roundedCircle className="m-4" />
          </div>
          <div className="d-flex flex-column justify-content-center me-auto">
            <div>
              主揪：{leaderName}
              <br></br>
              地點：{location}
              <br></br>
              {/* 日期：{date}<br></br> */}
              開始時間：{startTime}
              <br></br>
              結束時間：{endTime}
              <br></br>
              目前人數：{participants.length}/{participantsLimit}人
            </div>
          </div>
          <div className="d-flex flex-column justify-content-evenly mt-3 mt-lg-0">
            <div className="my-1">
              <ParticipantsList title={title} participantsLimit={participantsLimit} participants={participants} />
            </div>
            <div className="my-1">
              <Button className="w-100" variant="outline-success" onClick={onClickJoin}>
                加入揪團
              </Button>
            </div>
            <div className="my-1">
              <Button className="w-100" variant="outline-danger" onClick={onClickRetrieve}>
                退出揪團
              </Button>
            </div>
            <>
              {leaderId === userId ? (
                <div className="my-1">
                  <Button className="w-100" variant="outline-danger" onClick={onClickDelete}>
                    刪除揪團
                  </Button>
                </div>
              ) : (
                ""
              )}
            </>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Upload {uploadTime}</small>
      </Card.Footer>
    </Card>
  );
}

export default PostItem;
