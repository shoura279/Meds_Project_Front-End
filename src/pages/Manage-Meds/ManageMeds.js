import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
//import Alert from "react-bootstrap/Alert";
import "../../css/ManageMeds.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageMeds = () => {
  const auth = getAuthUser();
  const [meds, setMeds] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setMeds({ ...meds, loading: true });
    axios
      .get("http://localhost:5000/meds/Medicine")
      .then((resp) => {
        setMeds({ ...meds, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setMeds({ ...meds, loading: false, err: "something went wrong" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meds.reload]);

  const deleteMed = (id) => {
    axios
      .delete("http://localhost:5000/meds/admin/deleteCategory/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setMeds({ ...meds, reload: meds.reload + 1 });
      })
      .catch((err) => {
        setMeds({ ...meds, err: "something went wrong" });
      });
  };

  return (
    <div className="managemeds p-5">
      <h1 className="head">Manage Medicines</h1>

      {/* <Alert id="alrt" variant="success">
        This is an alert
      </Alert>
      <Alert id="alrt" variant="danger">
        This is an alert
      </Alert>  */}

      <Link to={"AddMedicine"} id="add-button" className="btn btn-dark">
        Add New
      </Link>

      <Table className="text-center" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Expair Date</th>
            <th>Category ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {meds.results.map((meds) => (
            <tr key={meds.id}>
              <td id="table-text">{meds.id}</td>
              <td id="table-text">{meds.name}</td>
              <td>
                <img className="image" src={meds.img_url} alt="img"></img>
              </td>
              <td id="table-text">{meds.description}</td>
              <td id="table-text">{meds.price} L.E</td>
              <td id="table-text">{meds.expiration_date}</td>
              <td id="table-text">{meds.category_id}</td>
              <td className="text-center pt-4">
                <button
                  className="btn btn-outline-light btn-sm mx-2 my-1"
                  onClick={() => {
                    deleteMed(meds.id);
                  }}
                >
                  Delete
                </button>
                <Link
                  to={"" + meds.id}
                  className="btn btn-outline-light btn-sm mx-2"
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

export default ManageMeds;
