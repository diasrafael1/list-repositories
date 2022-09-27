import { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaBars, FaTrash } from "react-icons/fa";
import { api } from "../../services/api";
import {
  Alert,
  Container,
  DeleteButton,
  Form,
  List,
  SubmitButton,
} from "./styles";

interface Repository {
  name: string;
}

export default function Main() {
  const [repoName, setRepoName] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [alert, setAlert] = useState("");

  const handleSubmit = useCallback(
    (e: any): void => {
      e.preventDefault();

      async function submit(): Promise<void> {
        setAlert("");
        try {
          if (!repoName) {
            throw new Error("Você precisa indicar um repositório!");
          }

          const response = await api.get(`repos/${repoName}`);

          const hasRepo = repositories.find((repo) => repo.name === repoName);

          if (hasRepo) {
            throw new Error("Já está cadastrado esse repositório!");
          }

          const name: string = response.data.full_name;

          setRepositories([...repositories, { name }]);
          setRepoName("");
        } catch (error: any) {
          setAlert(error.message);
        }
      }

      submit();
    },
    [repoName, repositories]
  );

  function handleChangeValue(e: any): void {
    setRepoName(e.target.value);
  }

  const handleDelete = useCallback(
    (repoName: string): void => {
      const find = repositories.filter((repo) => repo.name !== repoName);
      setRepositories(find);
    },
    [repositories]
  );

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
          style={alert ? { border: "1px solid red" } : null}
        />

        <SubmitButton type="submit">
          <FaPlus color="#ffff" size={14} />
        </SubmitButton>
      </Form>

      <Alert>
        <span>{alert}</span>
      </Alert>

      <List>
        {repositories.map((repository, index) => {
          return (
            <li key={index}>
              <span>
                <DeleteButton
                  type="button"
                  onClick={() => handleDelete(repository.name)}
                >
                  <FaTrash size={14} />
                </DeleteButton>
                {repository.name}
              </span>
              <a>
                <FaBars size={20} />
              </a>
            </li>
          );
        })}
      </List>
    </Container>
  );
}
