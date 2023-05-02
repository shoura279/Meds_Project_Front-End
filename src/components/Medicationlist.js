import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../css/Medicationlist.css";
import { useState } from "react";
import { getAuthUser } from "../helper/Storage";
import axios from "axios";
import Form from "react-bootstrap/Form";

const Medicationlist = (props) => {
  const auth = getAuthUser();
  const [req, setReq] = useState({
    user_id: "",
    medicine_id: "",
    counter: 0,
    err: [],
    success: null,
  });
  const SendReq = (e) => {
    e.preventDefault();
    const raw = { user_id: auth.id, medicine_id: props.id };
    axios
      .post("http://localhost:5000/meds/user/sendRequests", raw, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setReq({
          user_id: "",
          medicine_id: "",
          err: [],
          success: "done",
          counter: req.counter + 1,
        });
      })
      .catch((errors) => {
        setReq({
          ...req,
          err: errors.response.data.errors,
          success: null,
        });
      });
  };

  return (
    <Form onSubmit={SendReq}>
      <Card
        border="light"
        style={{ borderRadius: "1.1rem" }}
        bg="dark"
        text="light"
      >
        <Card.Img className="MedCard-img" variant="bot" src={props.img_url} />
        <Card.Body id="MedCard">
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Card.Text className=" fs-5 fw-bold">{props.price} L.E</Card.Text>

          {auth && (
            <Button
              type="submit"
              variant="outline-light"
              id="button-cart"
              className="bt btn-dark w-50 py-2"
            >
              Add to Cart{req.success && " x" + req.counter}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Form>
  );
};

export default Medicationlist;
