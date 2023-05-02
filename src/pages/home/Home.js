import React, { useEffect, useState } from "react";
import Medicationlist from "../../components/Medicationlist";
import "../../css/Home.css";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";

const Home = () => {
  const auth = getAuthUser();

  const [meds, setMeds] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    setMeds({ ...meds, loading: true });
    axios
      .get("http://localhost:5000/meds/Medicine", {
        params: {
          search: search,
        },
      })
      .then((resp) => {
        setMeds({ ...meds, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setMeds({ ...meds, loading: false, err: "something went wrong" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meds.reload]);

  const serachMeds = (e) => {
    e.preventDefault();
    setMeds({ ...meds, reload: meds.reload + 1 });
  };

  const addMed = (e) => {
    e.preventDefault();
    const raw = { description: search };

    axios
      .post("http://localhost:5000/meds/user/addtohistory/" + auth.id, raw, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setMeds({ ...meds, reload: meds.reload + 1 });
      })
      .catch((errors) => {
        setMeds({ ...meds, reload: meds.reload + 1 });
      });
  };

  return (
    <div className="homecontainer">
      {/*==================================LOADER=================================*/}
      {meds.loading === true && (
        <div className="text-center">
          <Spinner id="load-spin" animation="grow" />
        </div>
      )}

      {/*==================================FILTER==================================*/}
      {meds.loading === false && (
        <Form className="Search" onSubmit={serachMeds}>
          <Form.Group className="mb-3 d-flex">
            <Form.Control
              type="text"
              placeholder="Search"
              className="input mx-1"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <button className="btn btn-dark mx-3" onClick={addMed}>
              Find
            </button>
          </Form.Group>
        </Form>
      )}
      {/*=================================LIST MEDS================================*/}
      {meds.loading === false && meds.err === null && (
        <>
          {/*================================MEDICATION LIST===============================*/}
          <div className="row">
            {meds.results.map((meds) => (
              <div className="col-3 p-3" key={meds.id}>
                <Medicationlist
                  name={meds.name}
                  description={meds.description}
                  price={meds.price}
                  expiration_date={meds.expiration_date}
                  category={meds.category_id}
                  img_url={meds.img_url}
                  id={meds.id}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/*================================ERRORS HANDEL===============================*/}
      {meds.loading === false && meds.err != null && (
        <div id="cast-alert">
          <Alert className="fs-6 fw-bold" variant="info">
            Can't find any medicine, try again later!
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Home;
