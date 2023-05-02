import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../css/Login.css";
import axios from "axios";
import { setAuthUser } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:5000/meds/login", {
        email: login.email,
        password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div id="loginandup-container">
      <h1 className="head">Login Form</h1>

      {login.err.map((error, index) => (
        <Alert key={index} variant="danger">
          {error.msg}
        </Alert>
      ))}

      <Form onSubmit={LoginFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            required
            placeholder="Please enter your email"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            pattern=".{8,}"
            required
            title="8 characters minimum"
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>

        {/* Login button */}
        <Button
          className="bt btn-dark w-100 mb-5"
          variant="primary"
          type="submit"
          disabled={login.loading === true}
        >
          {/* Defulte */}
          {login.loading === false && "Log in"}

          {/* loading on submit */}
          {login.loading === true && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
