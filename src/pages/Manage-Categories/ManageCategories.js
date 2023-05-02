import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
//import Alert from "react-bootstrap/Alert";
import "../../css/ManageCategories.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageCatigory = () => {
  const auth = getAuthUser();
  const [categories, setCategories] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setCategories({ ...categories, loading: true });
    axios
      .get("http://localhost:5000/meds/getCategore")
      .then((resp) => {
        setCategories({ ...categories, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setCategories({ ...categories, loading: false, err: "something went wrong" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.reload]);

  const deleteCategory = (id) => {
    axios
      .delete("http://localhost:5000/meds/admin/deleteCategory/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setCategories({ ...categories, reload: categories.reload + 1 });
      })
      .catch((err) => {
        setCategories({ ...categories, err: "something went wrong" });
      });
  };

  return (
    <div className="managemeds p-5">
      <h1 className="head">Manage Categories</h1>

      {/* <Alert id="alrt" variant="success">
        This is an alert
      </Alert>
      <Alert id="alrt" variant="danger">
        This is an alert
      </Alert>  */}

      <Link to={"AddCategory"} id="add-button" className="btn btn-dark">
        Add New
      </Link>

      <Table className="text-center" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.results.map((meds) => (
            <tr key={meds.id}>
              <td id="table-text">{meds.id}</td>
              <td id="table-text">{meds.name}</td>
              <td id="table-text">{meds.description}</td>
              <td className="text-center">
                <button
                  className="btn btn-outline-light btn-sm me-3 my-3"
                  onClick={() => {
                    deleteCategory(meds.id);
                  }}
                >
                  Delete
                </button>
                <Link
                  to={"" + meds.id}
                  className="btn btn-outline-light btn-sm ms-3"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageCatigory;
