import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
//import Alert from "react-bootstrap/Alert";
import "../../css/ManegeUsers.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageUsers = () => {
  const auth = getAuthUser();
  const [user, setUser] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setUser({ ...user, loading: true });
    axios
      .get("http://localhost:5000/meds/admin/getallusers", {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setUser({ ...user, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setUser({ ...user, loading: false, err: "something went wrong" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.reload]);

  const deleteMed = (id) => {
    axios
      .delete("http://localhost:5000/meds/admin/deleteUser/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setUser({ ...user, reload: user.reload + 1 });
      })
      .catch((err) => {
        setUser({ ...user, err: "something went wrong" });
      });
  };

  return (
    <div className="managemeds p-5">
      <h1 className="head">Manage users</h1>

      {/* <Alert id="alrt" variant="success">
        This is an alert
      </Alert>
      <Alert id="alrt" variant="danger">
        This is an alert
      </Alert>  */}

      <Link to={"AddUser"} id="add-button" className="btn btn-dark">
        Add New
      </Link>

      <Table className="text-center" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.results.map(
            (user) =>
              user.type === 0 && (
                <tr key={user.id}>
                  <td id="table-text">{user.id}</td>
                  <td id="table-text">{user.name}</td>
                  <td id="table-text">{user.email}</td>
                  <td id="table-text">{user.phone}</td>
                  <td id="table-text">
                    {user.status === 0 && "In-Active"}
                    {user.status === 1 && "Active"}
                  </td>
                  <td className="text-center pt-4">
                    <button
                      className="btn btn-outline-light btn-sm mx-2 my-1"
                      onClick={() => {
                        deleteMed(user.id);
                      }}
                    >
                      Delete
                    </button>
                    <Link
                      to={"" + user.id}
                      className="btn btn-outline-light btn-sm mx-2"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
