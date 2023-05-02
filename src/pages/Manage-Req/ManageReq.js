import React, { useEffect, useState } from "react";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { Table } from "react-bootstrap";

const ManageReq = () => {
  const auth = getAuthUser();
  const [req, setReq] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const AcceptFun = (id) => {
    const raw = "";
    axios
      .patch("http://localhost:5000/meds/admin/acceptRequests/" + id, raw, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setReq({
          ...req,
          loading: false,
          success: "success",
          reload: req.reload + 1,
        });
      })

      .catch((errors) => {
        setReq({
          ...req,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };

  const DeclineFun = (id) => {
    const raw = "";

    axios
      .patch("http://localhost:5000/meds/admin/ignoreRequests/" + id, raw, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setReq({
          ...req,
          loading: false,
          success: "success",
          reload: req.reload + 1,
        });
      })

      .catch((errors) => {
        setReq({
          ...req,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };

  useEffect(() => {
    setReq({ ...req, loading: true });
    axios
      .get("http://localhost:5000/meds/admin/getRequist", {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setReq({ ...req, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setReq({ ...req, loading: false, err: "something went wrong" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [req.reload]);

  return (
    <div className="managemeds p-5">
      <h1 className="head">Manage Requesets</h1>

      {/* <Alert id="alrt" variant="success">
        This is an alert
      </Alert>
      <Alert id="alrt" variant="danger">
        This is an alert
      </Alert>  */}

      <Table className="text-center" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User ID</th>
            <th>Medicine ID</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {req.results.map((req) => req.status===0 &&(
            <tr key={req.id}>
              <td id="table-text">{req.id}</td>
              <td id="table-text">{req.user_id}</td>
              <td id="table-text">{req.medicine_id}</td>
              <td id="table-text">{req.request_date}</td>
              <td className="text-center pt-4">
                <button
                  onClick={() => {
                    AcceptFun(req.id);
                  }}
                  className="btn btn-outline-light btn-sm py-2 mx-2 my-1"
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline-light btn-sm py-2 mx-2 my-1"
                  onClick={() => {
                    DeclineFun(req.id);
                  }}
                >
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageReq;
