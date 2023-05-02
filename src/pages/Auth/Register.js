import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import "../../css/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:5000/meds/registr", {
        name: register.name,
        email: register.email,
        password: register.password,
        phone: register.phone,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        navigate("/login");
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div className="loginandup-container">
      <h1 className="head">Registration Form</h1>

      {register.err.map((error, index) => (
        <Alert key={index} variant="danger">
          {error.msg}
        </Alert>
      ))}

      <Form onSubmit={RegisterFun}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="First and last name"
            required
            value={register.name}
            onChange={(e) => setRegister({ ...register, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email Address"
            required
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            pattern=".{8,}"
            required
            title="8 characters minimum"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="tel"
            placeholder="Phone Number"
            required
            value={register.phone}
            onChange={(e) =>
              setRegister({ ...register, phone: e.target.value })
            }
          />
        </Form.Group>

        {/* Register button */}
        <Button
          className="bt btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={register.loading === true}
        >
          {/* Defulte */}
          {register.loading === false && "Sign up"}

          {/* loading on submit */}
          {register.loading === true && (
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

export default Register;
