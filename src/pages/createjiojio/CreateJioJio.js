import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import Datetime from "react-datetime";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datetime/css/react-datetime.css";
import { launch_jio_jio } from "../../api/post/LaunchJioJio";

const CreateJioJio = ({ userId, userName, userProfilePictureUrl, clubId, clubName, clubProfilePictureUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errObj, setErrObj] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [jio, setJio] = useState({
    userId: userId,
    userName: userName,
    userProfilePictureUrl: userProfilePictureUrl,
    groupId: clubId,
    groupName: clubName,
    activity: "",
    start: moment(),
    end: moment().add(2, "hours"),
    place: "",
    person: 1,
  });

  const personList = [];
  Array.from({ length: 30 }, (_, k) => k + 1).forEach((i) =>
    personList.push(
      <option value={i} key={i}>
        {i}
      </option>
    )
  );

  const check_jio_valid = () => {
    for (let key in errObj) {
      if (errObj[key] === true) return false;
    }
    return true;
  };

  const onLaunchPress = () => {
    setIsLoading(true);
    if (check_jio_valid())
      launch_jio_jio(jio)
        .then((res, rej) => {
          console.log(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setErrObj({ ...errObj, 網路傳輸錯誤: true });
        });
    else setIsLoading(false);

    setShow(true);
  };

  const onClosePress = () => setShow(false);

  useEffect(() => {
    const newErrObj = {};
    newErrObj["揪團名稱不能為空"] = jio.name === "";
    newErrObj["活動地點不能為空"] = jio.place === "";
    newErrObj["開始時間需早於結束時間"] = jio.startTime > jio.endTime;
    setErrObj(newErrObj);
  }, [jio]);

  useEffect(() => {
    let msg = "錯誤訊息: ";
    let flag = true;
    for (let key in errObj) {
      if (errObj[key] && flag) {
        msg = msg.concat("", key);
        flag = false;
      } else if (errObj[key]) {
        msg = msg.concat(", ", key);
      }
    }
    setErrMsg(msg);
  }, [errObj]);

  return (
    <div>
      <Form className="d-flex flex-column">
        <Form.Group className="align-self-center p-2">
          <Form.Label>揪團名稱</Form.Label>
          <Form.Control value={jio.activity} onChange={(e) => setJio({ ...jio, activity: e.target.value })} />
        </Form.Group>

        <Form.Group className="d-flex flex-column flex-sm-row align-self-center p-1">
          <Form.Group className="justify-content-center p-1">
            <Form.Label>活動開始時間</Form.Label>
            <Datetime
              value={jio.start}
              onChange={(date) => {
                const tmp = moment(date).add(2, "hours");
                if (jio.end < date) setJio({ ...jio, start: date, end: tmp });
                else setJio({ ...jio, start: date });
              }}
              dateFormat={"YYYY/MM/DD"}
              timeFormat={"H:mm"}
              isValidDate={(cur, sel) => cur >= moment()}
            />
          </Form.Group>
          <Form.Group className="justify-content-center p-1">
            <Form.Label>活動結束時間</Form.Label>
            <Datetime
              value={jio.end}
              onChange={(date) => {
                if (date >= jio.start) setJio({ ...jio, end: date });
              }}
              dateFormat={"YYYY/MM/DD"}
              timeFormat={"H:mm"}
              isValidDate={(cur, sel) => cur >= jio.start - 8.64e7}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="align-self-center p-2">
          <Form.Label>活動地點</Form.Label>
          <Form.Control value={jio.place} onChange={(e) => setJio({ ...jio, place: e.target.value })} />
        </Form.Group>

        <Form.Group className="align-self-center p-2">
          <Form.Label>人限</Form.Label>
          <Form.Select value={jio.person} onChange={(e) => setJio({ ...jio, person: e.target.value })}>
            {personList}
          </Form.Select>
        </Form.Group>
        {isLoading ? (
          <div className="d-flex flex-column align-item-center">
            <div className="p-2" />
            <Spinner
              animation="border"
              role="status"
              className="align-self-center justify-content-center"
              variant="primary"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <div className="p-2" />
          </div>
        ) : (
          <Form.Group className="align-self-center p-2">
            <Button onClick={(e) => onLaunchPress()}>發起揪揪</Button>
          </Form.Group>
        )}
      </Form>

      <Modal show={show} onHide={onClosePress}>
        <Modal.Header closeButton style={check_jio_valid() ? { backgroundColor: "green" } : { backgroundColor: "red" }}>
          <Modal.Title style={{ color: "white" }}>{check_jio_valid() ? "揪揪成功" : "揪揪失敗"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{check_jio_valid() ? "已成功發起您的揪揪" : errMsg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClosePress}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateJioJio;
