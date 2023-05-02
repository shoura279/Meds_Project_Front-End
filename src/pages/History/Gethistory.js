import React, { useEffect, useState } from "react";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { Table } from "react-bootstrap";

const Gethistory = () => {
  const auth = getAuthUser();
  const [req, setReq] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setReq({ ...req, loading: true });
    axios
      .get("http://localhost:5000/meds/user/history/" + auth.id, {
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
      <h1 className="head">My Requestes</h1>

      {/* <Alert id="alrt" variant="success">
        This is an alert
      </Alert>
      <Alert id="alrt" variant="danger">
        This is an alert
      </Alert>  */}

      <Table className="text-center" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Search word</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {req.results[0] &&
            req.results.map((req) => (
              <tr key={req.id}>
                <td id="table-text">{req.description}</td>
                <td id="table-text">{req.data}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Gethistory;
