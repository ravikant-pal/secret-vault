import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Home.css";
import * as service from "../service";

function Home() {
  const [clipBoardClass, setClipBoardClass] = useState("clipboard");
  const [modalShow, setModalShow] = useState(false);
  const [keys, setKeys] = useState(service.getAllKeys());
  const [key, setKey] = useState("");
  const [values, setValues] = useState([]);
  const [value, setValue] = useState("");
  const [selectedKey, setSelectedKey] = useState("");

  const handelMsgClick = (msg) => {
    navigator.clipboard.writeText(msg);
    setClipBoardClass("check2-all text-success");
    setTimeout(() => {
      setClipBoardClass("clipboard");
    }, 2000);
  };

  const handleAddKey = () => {
    service.addNewKey(key);
    setKeys(service.getAllKeys);
    setModalShow(false);
  };

  const handelSelect = (k) => {
    setValues(service.getValuesForKey(k));
    setSelectedKey(k);
  };

  return (
    <div className="container mt-5">
      <div className="row container-row">
        <div className="col-md-4 border rounded">
          <div className="row p-2 rounded border-bottom ">
            <h2> Your Keys</h2>
          </div>

          <div className="scrollable-container">
            {keys.map((k, i) => (
              <div
                className={`row p-2 rounded keys-row border-bottom ${
                  selectedKey == k ? "selected-key" : ""
                }`}
                key={i}
                onClick={() => handelSelect(k)}
              >
                <div className="col-md-3">
                  <img
                    src="https://img.icons8.com/cute-clipart/50/000000/key.png"
                    className="rounded-circle shadow"
                  />
                </div>
                <div className="col-md-9 p-2">{k}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-8 border rounded">
          {selectedKey ? (
            <div className="row  p-2 rounded border-bottom ">
              <div className="col-md-2">
                <img
                  src="https://img.icons8.com/cute-clipart/50/000000/key.png"
                  className="rounded-circle shadow"
                />
              </div>

              <div className="col-md-10 p-2">{selectedKey}</div>
            </div>
          ) : (
            ""
          )}

          <div className="scrollable-container">
            {values.map((v, i) => (
              <div
                className="row mt-2 msg"
                onClick={() => handelMsgClick(v)}
                key={i}
              >
                <i className={`bi bi-${clipBoardClass}`}></i>
                <p className="text-end">
                  <span className="p-2 rounded-pill">{v}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 border rounded">
          <div className="row  p-2 rounded border-bottom ">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setModalShow(true)}
            >
              <i className="bi bi-plus-circle p-2"></i>Add New Key
            </button>
          </div>
        </div>
        <div className="col-md-8 border rounded">
          <div className="row p-2">
            <div className="col-md-11">
              <input
                type="text"
                className="form-control"
                placeholder="Add new value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    service.addValue(selectedKey, value);
                    setValues(service.getValuesForKey(selectedKey));
                    setValue("");
                  }
                }}
                disabled={!selectedKey}
              ></input>
            </div>
            <div className="col-md-1">
              <button
                type="button"
                className="btn btn-primary btn-icon"
                onClick={() => service.addValue(selectedKey, value)}
                disabled={!selectedKey}
              >
                <i className="bi bi-send-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddKeyModal
        show={modalShow}
        onSubmit={handleAddKey}
        onHide={() => setModalShow(false)}
        onChange={(e) => setKey(e.target.value)}
      />
    </div>
  );
}

function AddKeyModal(props) {
  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Key"
          onChange={props.onChange}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              props.onSubmit();
            }
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onSubmit}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Home;
