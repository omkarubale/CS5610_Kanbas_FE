import React, { useState, useEffect } from "react";
import * as client from "./client";
import { User } from "./client";
import { BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import { Button, Form } from "react-bootstrap";
import { FaCheckCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "2021-01-01",
    role: "USER",
  });
  const [role, setRole] = useState("USER");

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const fetchUsersByRole = async (role: string) => {
    const users = await client.findUsersByRole(role);
    setRole(role);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="container">
      <h1 className="pt-3">
        User Table{" "}
        <Form.Select
          onChange={(e) => fetchUsersByRole(e.target.value)}
          value={role || "USER"}
          className="form-control w-25 float-end"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th></th>
          </tr>
          <tr>
            <td>
              <Form.Group className="d-flex">
                <Form.Control
                  value={user.username}
                  placeholder="Username"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <Form.Control
                  value={user.password}
                  placeholder="Password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </Form.Group>
            </td>
            <td>
              <Form.Control
                value={user.firstName}
                placeholder="First Name"
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </td>
            <td>
              <Form.Control
                value={user.lastName}
                placeholder="Last Name"
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td>
              <Form.Select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </Form.Select>
            </td>
            <td>
              <div className="d-inline-flex">
                <Button className="d-contents" onClick={updateUser}>
                  <div className="d-flex justify-content-center align-items-center me-2">
                    <FaCheckCircle size={24} color="green" />
                  </div>
                </Button>
                <Button className="d-contents" onClick={createUser}>
                  <div className="d-flex justify-content-center align-items-center">
                    <FaPlusCircle size={24} color="green" />
                  </div>
                </Button>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
                <div className="d-inline-flex">
                  <Button
                    className="d-contents"
                    onClick={() => deleteUser(user)}
                  >
                    <div className="d-flex justify-content-center align-items-center me-2">
                      <FaTrash size={24} color="rgb(181, 40, 40)" />
                    </div>
                  </Button>
                  <Button
                    className="d-contents"
                    onClick={() => selectUser(user)}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <FaPencil size={24} color="#FFC00A" />
                    </div>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
