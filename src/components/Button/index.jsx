import { Container } from "./styles";

function Button({ children, ...rest }) {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
}

export { Button };
