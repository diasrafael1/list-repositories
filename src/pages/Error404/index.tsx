import { Container } from "./styles";
import { BiError } from "react-icons/bi";

export default function Error() {
  return (
    <Container>
      <h1>Error404</h1>
      <BiError size={100} />

      <h3>Página não encontrada! :(</h3>
    </Container>
  );
}
