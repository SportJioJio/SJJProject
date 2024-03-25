import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";

function ParticipantsList({ title, participantsLimit, participants }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="w-100" variant="outline-secondary" onClick={handleShow}>
        查看名單
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            {participants.map((x, index) => {
              if (index === participantsLimit) {
                return (
                  <>
                    <hr></hr>
                    <b>以下候補：</b>
                  </>
                );
              } else {
                return <div>{`${index + 1}. ${x.name}`}</div>;
              }
            })}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ParticipantsList;
