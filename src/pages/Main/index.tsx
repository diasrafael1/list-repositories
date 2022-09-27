import { useState, useCallback } from "react";
import { FaGithub, FaPlus } from "react-icons/fa";
import { api } from "../../services/api";
import { Container, Form, SubmitButton } from "./styles";

interface Repository {
  name: string;
}

export default function Main() {
  const [repoName, setRepoName] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleSubmit = useCallback(
    (e: any): void => {
      e.preventDefault();

      async function submit(): Promise<void> {
        try {
          const response = await api.get(`repos/${repoName}`);
          const name: string = response.data.full_name;

          setRepositories([...repositories, { name }]);
          setRepoName("");
        } catch (error) {
          console.log(error);
        }
      }

      submit();
    },
    [repoName, repositories]
  );

  function handleChangeValue(e: any): void {
    setRepoName(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25} /> Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicione repositórios"
          value={repoName}
          onChange={handleChangeValue}
        />

        <SubmitButton type="submit">
          <FaPlus color="#ffff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
