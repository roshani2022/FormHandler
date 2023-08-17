import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "User_input") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "Input_blur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "User_input") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "Input_blur") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};
const collegeReducer = (state, action) => {
  if (action.type === "User_input") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "Input_blur") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const [collegeState, dispatchcollege] = useReducer(collegeReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("effect running");

    return () => {
      console.log("effect cleanup");
    };
  }, []);

  const {isValid:emailIsValid} = emailState;
  const {isValid:passwordIsValid} = passwordState;
  const {isValid:collegeIsValid} = collegeState;

  useEffect(() => {
    const identifire = setTimeout(() => {
      console.log("check form validity");
      setFormIsValid(
        emailIsValid&&
          passwordIsValid &&
          collegeIsValid
      );
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifire);
    };
  }, [emailIsValid,passwordIsValid,collegeIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "User_input", val: event.target.value });
    // setFormIsValid(
    //   event.target.value.includes("@") &&
    //     passwordState.isValid &&
    //     collegeState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "User_input", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.trim().length > 6 &&
    //     collegeState.isValid
    // );
  };
  const collegeNameHandler = (event) => {
    dispatchcollege({ type: "User_input", val: event.target.value });
    // setFormIsValid(
    //   emailState.isValid &&
    //     passwordState.isValid &&
    //     event.target.value.trim().length > 0
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "Input_blur" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "Input_blur" });
  };
  const validateCollegedHandler = () => {
    dispatchcollege({ type: "Input_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeNameHandler}
            onBlur={validateCollegedHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
