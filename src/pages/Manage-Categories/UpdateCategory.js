import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";
import "../../css/UpdateCategories.css";

const UpdateCategory = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const [categories, setCategories] = useState({
    name: "",
    description: "",
    err: [],
    reload: false,
    loading: false,
    success: null,
  });

  const updateMed = (e) => {
    e.preventDefault();

    setCategories({ ...categories, loading: true });

    const raw = { name: categories.name, description: categories.description };

    axios
      .patch("http://localhost:5000/meds/admin/updataCategory/" + id, raw, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setCategories({
          ...categories,
          loading: false,
          success: "Categories updated successfully",
          reload: categories.reload + 1,
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/meds/getCategore/" + id)
      .then((resp) => {
        setCategories({
          ...categories,
          name: resp.data[0].name,
          description: resp.data[0].description,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.reload]);

  return (
    <div className="Add-container">
      <h1 className="head">Update category</h1>

      {categories.success === null &&
        categories.err.map((error, index) => (
          <Alert key={index} className="head" variant="danger">
            {error.msg}
          </Alert>
        ))}

      {categories.success && (
        <Alert className="head" variant="success">
          {categories.success}
        </Alert>
      )}

      <Form onSubmit={updateMed}>
        <Form.Group className="mb-3">
          <Form.Control
            value={categories.name}
            onChange={(e) =>
              setCategories({ ...categories, name: e.target.value })
            }
            type="text"
            placeholder="Category's name"
          />
          <Form.Text className="clr">Enter category's name</Form.Text>
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
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCategory;
