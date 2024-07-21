import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { login } from "../../services/apiAuth";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { ButtonWhileLoading } from "../../ui/ButtonWhileLoading";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin, isLoggingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) return;

    userLogin(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoggingIn}>
          {!isLoggingIn ? (
            "Login"
          ) : (
            <ButtonWhileLoading>
              <SpinnerMini /> Login
            </ButtonWhileLoading>
          )}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
