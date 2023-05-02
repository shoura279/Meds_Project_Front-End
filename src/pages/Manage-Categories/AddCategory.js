import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/AddCategory.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const AddCategory = () => {
  const auth = getAuthUser();
  const [categories, setCategories] = useState({
    name: "",
    description: "",
    err: [],
    loading: false,
    success: null,
  });

  const addCategory = (e) => {
    e.preventDefault();
    setCategories({ ...categories, loading: true });

    const raw = { name: categories.name, description: categories.description };
    axios
      .post("http://localhost:5000/meds/admin/createCategore", raw, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setCategories({
          name: "",
          description: "",
          err: [],
          loading: false,
          success: "Category added successfully",
        });
      })
      .catch((errors) => {
        setCategories({
          ...categories,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div className="Add-container">
      <h1 className="head">Add new category</h1>

      {categories.err.map((errors, index) => (
        <Alert key={index} className="head" variant="danger">
          {errors.msg}
        </Alert>
      ))}

      {categories.success && (
        <Alert className="head" variant="success">
          {categories.success}
        </Alert>
      )}

      <Form onSubmit={addCategory}>
        <Form.Group className="mb-3">
          <Form.Control
            value={categories.name}
            onChange={(e) =>
              setCategories({ ...categories, name: e.target.value })
            }
            type="text"
            placeholder="Category name"
          />
          <Form.Text className="clr">Enter the category's name</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            value={categories.description}
            onChange={(e) =>
              setCategories({ ...categories, description: e.target.value })
            }
            className="form-control"
            placeholder="Description"
            rows={2}
          ></textarea>
          <Form.Text className="clr">Type a description</Form.Text>
        </Form.Group>

        <Button className="bt btn-dark w-100" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};
export default AddCategory;
