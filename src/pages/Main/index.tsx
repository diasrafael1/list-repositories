import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import MainForm from "../../components/Form";
import ListRepos from "../../components/ListRepos";
import { Alert, Container } from "./styles";

export interface Repository {
  name: string;
}

export default function Main() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const repoStorage = localStorage.getItem("repositories");

    if (repoStorage) {
      setRepositories(JSON.parse(repoStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repositories", JSON.stringify(repositories));
  }, [repositories]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} /> Meus Repositórios
      </h1>

      <MainForm
        alert={alert}
        setAlert={setAlert}
        repositories={repositories}
        setRepositories={setRepositories}
      />

      <Alert>
        <span>{alert}</span>
      </Alert>

      <ListRepos repositories={repositories} setRepositories={setRepositories} />
    </Container>
  );
}
