import React, { useEffect, useRef, useState } from "react";
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
    description: "",
    price: "",
    expaire_date: "",
    category_id: "",
    imageURL: null,
    err: [],
    reload: false,
    loading: false,
    success: null,
  });

  const image = useRef(null);

  const updateMed = (e) => {
    e.preventDefault();

    setMeds({ ...meds, loading: true });

    const formDate = new FormData();
    formDate.append("name", meds.name);
    formDate.append("description", meds.description);
    formDate.append("price", meds.price);
    formDate.append("expaire_date", meds.expaire_date);
    formDate.append("category_id", meds.category_id);
    if (image.current.files && image.current.files[0]) {
      formDate.append("imageURL", image.current.files[0]);
    }
    axios
      .put("http://localhost:5000/meds/admin/updateMedicine/" + id, formDate, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setMeds({
          ...meds,
          loading: false,
          success: "Medicine updated successfully",
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
      .get("http://localhost:5000/meds/Medicine/" + id)
      .then((resp) => {
        setMeds({
          ...meds,
          name: resp.data.name,
          description: resp.data.description,
          price: resp.data.price,
          expaire_date: resp.data.expiration_date,
          category_id: resp.data.category_id,
          imageURL: resp.data.image_url,
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
      <h1 className="head">Update medicine</h1>

      {meds.err.map((error, index) => (
        <Alert key={index} className="head" variant="danger">
          {error.msg}
        </Alert>
      ))}

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
            placeholder="Medicine name"
          />
          <Form.Text className="clr">Enter medicine's name</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            value={meds.description}
            onChange={(e) => setMeds({ ...meds, description: e.target.value })}
            className="form-control"
            placeholder="Description"
            rows={2}
          ></textarea>
          <Form.Text className="clr">Type a description</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={meds.price}
            onChange={(e) => setMeds({ ...meds, price: e.target.value })}
            type="number"
            placeholder="Price"
          />
          <Form.Text className="clr">Enter a new price</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={meds.expaire_date}
            onChange={(e) => setMeds({ ...meds, expaire_date: e.target.value })}
            type="date"
            placeholder="Expire date"
          />
          <Form.Text className="clr">Enter the Expire date</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={meds.category_id}
            onChange={(e) => setMeds({ ...meds, category_id: e.target.value })}
            type="number"
            placeholder="Catigory ID"
          />
          <Form.Text className="clr">Enter the catigory ID</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="text-center">
            <img src={meds.imageURL} alt="pic" className="pic" />
          </div>
          <input type="file" className="form-control" ref={image}></input>
          <Form.Text className="clr">Choose a new image</Form.Text>
        </Form.Group>

        <Button className="bt btn-dark w-100" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateMed;
