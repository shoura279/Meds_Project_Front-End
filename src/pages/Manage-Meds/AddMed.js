import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/AddMed.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const AddMed = () => {
  const auth = getAuthUser();
  const [meds, setMeds] = useState({
    name: "",
    description: "",
    price: "",
    expaire_date: "",
    category_id: "",
    err: [],
    loading: false,
    success: null,
  });

  const image = useRef(null);

  const addMed = (e) => {
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
      .post("http://localhost:5000/meds/admin/createMedicine", formDate, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        setMeds({
          name: "",
          description: "",
          price: "",
          expaire_date: "",
          category_id: "",
          err: [],
          loading: false,
          success: "Medicine added successfully",
        });
        image.current.value = null;
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

  return (
    <div className="Add-container">
      <h1 className="head">Add new medicine</h1>

      {meds.err.map((errors, index) => (
        <Alert key={index} className="head" variant="danger">
          {errors.msg}
        </Alert>
      ))}

      {meds.success && (
        <Alert className="head" variant="success">
          {meds.success}
        </Alert>
      )}

      <Form onSubmit={addMed}>
        <Form.Group className="mb-3">
          <Form.Control
            value={meds.name}
            onChange={(e) => setMeds({ ...meds, name: e.target.value })}
            type="text"
            placeholder="Medicine name"
          />
          <Form.Text className="clr">Enter the medicine's name</Form.Text>
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
          <Form.Text className="clr">Enter a price</Form.Text>
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
          <input type="file" className="form-control" ref={image}></input>
          <Form.Text className="clr">Choose an image</Form.Text>
        </Form.Group>

        <Button className="bt btn-dark w-100" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};
export default AddMed;
