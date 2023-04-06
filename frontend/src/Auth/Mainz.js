import React, { useEffect, useState } from "react";
import * as Components from "./Components";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { login, register } from "../actions/userActions";
const Mainz = () => {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const dispatch = useDispatch();
  const registerh = async (e) => {
    e.preventDefault();
    var objj;
    if (!name || !email || !pass) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    } else if (pass !== cpass) {
      return swal({
        text: "Passwords are not matching",
        icon: "warning",
      });
    } else if (pass.length < 8) {
      return swal({
        text: "Passwords must have at least 8 characters",
        icon: "warning",
      });
    } else {
      fetch(`/api/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          pass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          objj = data;
          if (objj === 0) {
            swal("Sign Up Failed", "User already exists", "error");
          } else {
            swal("YaY", "Sign Up successfull", "success");
            localStorage.setItem("userInfo", JSON.stringify(objj));
            navigate("/mynotes");
            dispatch(register(objj));
          }
        });
    }
  };
  const loginh = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      return swal({
        text: "Please fill all fields",
        icon: "warning",
      });
    }
    var obj;
    fetch(`/api/user/login `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        obj = data;
        if (obj === 0) {
          return swal("Login failed", "Invalid email or password", "error");
        } else {
          swal("YaY", "Login successfull!!!", "success");
          localStorage.setItem("userInfo", JSON.stringify(obj));
          navigate("/mynotes");
          dispatch(login(obj));
        }
      });
  };
  return (
    <div className="body1">
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <Components.Input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <Components.Input
              type="password"
              placeholder="Password"
              name="pass"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              required
            />
            <Components.Input
              type="password"
              placeholder="Confirm Password"
              name="cpass"
              value={cpass}
              onChange={(e) => {
                setCpass(e.target.value);
              }}
              required
            />
            <Components.Button onClick={registerh}>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button onClick={loginh}>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Already registered!</Components.Title>
              <Components.Paragraph>
                Then please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, There!</Components.Title>
              <Components.Paragraph>
                New here then please Sign-Up
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Mainz;
