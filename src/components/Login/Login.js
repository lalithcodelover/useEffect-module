import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (state,action) => {
  if(action.type ==='USER_INPUT'){
    return {value:action.val ,isValid: action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value:state.value ,isValid:state.value.includes('@')}
  }
  return {value:'' ,isValid: false}
}

const passwordReducer =(state,action)=>{
  if(action.type === 'USER_INPUT'){
    return {value:action.val ,isValid: action.val.trim().length>6}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value:state.value , isValid: state.value.trim().length>6}
  }
  return {value:'',isValid:false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

const [emailState,dispatchEmail] = useReducer(emailReducer,{value:'',isValid: null})
const [passwordState,dispatchPassword] =useReducer(passwordReducer,{value:'',isValid:null})  

const {isValid: emailIsValid} = emailState
const {isValid: passwordIsValid} = passwordState

  useEffect(()=>{
    const identifier =setTimeout(()=>{
      console.log('Checking form validity')
      setFormIsValid(emailIsValid && passwordIsValid)
    },500)

    return ()=>{
      console.log("Clean UP")
      clearTimeout(identifier)
    }
    
  },[emailIsValid,passwordIsValid]) 

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT',val: event.target.value})

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT',val:event.target.value})

    setFormIsValid(
      passwordState.isValid && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
      <Input
          id="email"
          label="E-Mail"
          type="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        
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
