import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
import { Button, Form } from "react-bootstrap";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: new Date(),
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();

  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="mt-2 mb-4">Sign In</h1>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            value={credentials.username}
            placeholder="Username"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            value={credentials.password}
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </Form.Group>
        <Button className="w-100" onClick={signin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
