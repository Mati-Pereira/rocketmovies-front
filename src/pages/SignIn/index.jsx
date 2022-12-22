import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Container, Form, Background } from "./styles";
import { LineWobble } from "@uiball/loaders";
import { Controller, useForm } from "react-hook-form";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useAuth();

  const onSubmit = ({ email, password }) => {
    setIsLoading(true);
    signIn({
      email,
      password,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 100000);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis</p>
        <h2>Faça seu login</h2>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Email"
              type="text"
              icon={FiMail}
              onChange={onChange}
              value={value}
              required
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Password"
              type="password"
              icon={FiLock}
              onChange={onChange}
              value={value}
              required
            />
          )}
          name="password"
        />
        <Button type="submit">
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LineWobble size={30} lineWeight={5} speed={2} color="black" />
            </div>
          ) : (
            "Entrar"
          )}
        </Button>

        <Link to="/register">Criar conta</Link>
      </Form>

      <Background />
    </Container>
  );
}
