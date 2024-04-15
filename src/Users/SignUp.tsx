import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { Button, Form } from "react-bootstrap";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="mt-2 mb-4">Signup</h1>
        {error && <div>{error}</div>}
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            value={user.username}
            placeholder="Username"
            onChange={(e) =>
              setUser({
                ...user,
                username: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            value={user.password}
            placeholder="Password"
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
        </Form.Group>
        <Button className="w-100" onClick={signup}>
          Signup
        </Button>
      </div>
    </div>
  );
}
