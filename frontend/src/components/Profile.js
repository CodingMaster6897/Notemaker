import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update } from "../actions/userActions";
import Mscreen from "./Mscreen";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, success]);
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(update({ name, email, password }));
    
  };
  return (
    <>
      <Mscreen title="Edit Profile">
        <Card>
          <Card.Header>Edit Your Profile</Card.Header>
          <Card.Body>
            <Form onSubmit={updateHandler}>
              <Form.Group controlId="Title">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  placeholder="Enter the name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="Content">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter the email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="Category">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter the password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="Confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-3">
                Update Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Mscreen>
    </>
  );
};

export default Profile;
