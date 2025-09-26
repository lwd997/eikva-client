import { useContext, useState } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import { Context } from "../../main";

export const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formLoginLogin">
        <FormLabel>Логин</FormLabel>
        <Form.Control
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Введите логин"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLoginPassword">
        <FormLabel>Пароль</FormLabel>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
      </Form.Group>
      <Button
        className="mt-3"
        variant="primary"
        size="sm"
        style={{ width: "100%" }}
        onClick={() => store.login(login, password)}
      >
        Вход
      </Button>
      <Button
        className="mt-3"
        variant="secondary"
        size="sm"
        style={{ width: "100%" }}
        onClick={() => store.register(login, password)}
      >
        Регистрация
      </Button>
    </Form>
  );
};

export default LoginForm;
