import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  return (
    <div>
      <div className="form-div">
        <h2 className="signUp-header">{isLogin ? "Login" : "Sign Up"}</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control ref={email} type="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={password} type="password" required />
          </Form.Group>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control ref={confirmPassword} type="password" required />
            </Form.Group>
          )}
          <button className="forgot-password">Forgot password?</button>
          <br />
          <Button type="submit" variant="primary">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </Form>
      </div>

      <Button variant="secondary" className="login-button">
        {isLogin && "Dont't have an account? SignUp"}
        {!isLogin && "Have an account? Login"}
      </Button>
    </div>
  );
};

export default SignUp;
