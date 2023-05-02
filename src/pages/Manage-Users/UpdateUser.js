import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";
import "../../css/UpdateMed.css";

const UpdateMed = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [meds, setMeds] = useState({
    name: "",
    phone: "",
    status: "",
    err: [],
    reload: false,
    loading: false,
    success: null,
  });

  const updateMed = (e) => {
    e.preventDefault();

    setMeds({ ...meds, loading: true });

    const raw = { name: meds.name, phone: meds.phone, status: meds.status };
    axios
      .put("http://localhost:5000/meds/admin/updateUser/" + id, raw, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setMeds({
          ...meds,
          loading: false,
          success: "User updated successfully",
          reload: meds.reload + 1,
        });
      })

      .catch((errors) => {
        setMeds({
          ...meds,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/meds/admin/getSepecificUser/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        console.log(resp);
        setMeds({
          ...meds,
          name: resp.data[0].name,
          phone: resp.data[0].phone,
          status: resp.data[0].status,
        });
      })
      .catch((errors) => {
        setMeds({
          ...meds,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meds.reload]);

  return (
    <div className="Add-container">
      <h1 className="head">Update user</h1>

      {/* {meds.err.map((error, index) => (
        <Alert key={index} className="head" variant="danger">
          {error.msg}
        </Alert>
      ))} */}

      {meds.success && (
        <Alert className="head" variant="success">
          {meds.success}
        </Alert>
      )}

      <Form onSubmit={updateMed}>
        <Form.Group className="mb-3">
          <Form.Control
            value={meds.name}
            onChange={(e) => setMeds({ ...meds, name: e.target.value })}
            type="text"
            placeholder="User's name"
          />
          <Form.Text className="clr">Enter user's name</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            value={meds.phone}
            onChange={(e) => setMeds({ ...meds, phone: e.target.value })}
            className="form-control"
            placeholder="Phone"
            rows={2}
          ></textarea>
          <Form.Text className="clr">Type a phone number</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          {/* <Form.Control
            value={meds.status}
            onChange={(e) => setMeds({ ...meds, status: e.target.value })}
            type="number"
            placeholder="Status"
          /> */}
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setMeds({ ...meds, status: e.target.value })}
          >
            <option value={meds.value}>Select user is status</option>
            <option value="0">In-Active</option>
            <option value="1">Active</option>
          </Form.Select>
          <Form.Text className="clr">Enter a user's status</Form.Text>
        </Form.Group>

        <Button className="bt btn-dark w-100" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateMed;
