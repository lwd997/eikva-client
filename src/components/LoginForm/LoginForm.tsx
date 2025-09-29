import { useState } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { storage } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const LoginForm = observer(() => {
  const { login, register } = storage;

  const [log, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formLoginLogin">
        <FormLabel>Логин</FormLabel>
        <Form.Control
          type="text"
          value={log}
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
        onClick={() => login(log, password, () => navigate('/'))}
      >
        Вход
      </Button>
      <Button
        className="mt-3"
        variant="secondary"
        size="sm"
        style={{ width: "100%" }}
        onClick={() => register(log, password, () => navigate('/'))}
      >
        Регистрация
      </Button>
    </Form>
  );
});

export default LoginForm;
