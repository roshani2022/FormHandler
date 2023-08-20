import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/auth-context";
import Input from "../Input/Input";

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

  const authctx = useContext(AuthContext);

  useEffect(() => {
    console.log("effect running");

    return () => {
      console.log("effect cleanup");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const { isValid: collegeIsValid } = collegeState;

  useEffect(() => {
    const identifire = setTimeout(() => {
      console.log("check form validity");
      setFormIsValid(emailIsValid && passwordIsValid && collegeIsValid);
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifire);
    };
  }, [emailIsValid, passwordIsValid, collegeIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "User_input", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "User_input", val: event.target.value });
  };
  const collegeNameHandler = (event) => {
    dispatchcollege({ type: "User_input", val: event.target.value });
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
    if(formIsValid){
      authctx.onLogin(emailState.value, passwordState.value, collegeState.value);
    }
    else if(!emailIsValid){

    }
    else if(!passwordIsValid){

    }
    else{
      
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <Input
          id="college"
          type="text"
          label="College Name"
          isValid={collegeIsValid}
          value={collegeState.value}
          onChange={collegeNameHandler}
          onBlur={validateCollegedHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
