import * as client from "./client";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function Profile() {
  const [profile, setProfile] = useState<client.User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "2021-01-01",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const save = async () => {
    await client.updateUser(profile);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="mt-2 mb-4">Profile</h1>
        {profile && (
          <div>
            <Form.Group className="mb-2">
              <Form.Control
                value={profile.username}
                placeholder="Username"
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                value={profile.password}
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                value={profile.firstName}
                placeholder="First Name"
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                value={profile.lastName}
                placeholder="Last Name"
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                value={profile.dob}
                placeholder="Date of Birth"
                type="date"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    dob: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                value={profile.email}
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Select
              className="mb-2"
              aria-label="User Account Type"
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
            <Button onClick={save} className="w-100">
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
