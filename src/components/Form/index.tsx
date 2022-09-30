import { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { Repository } from "../../pages/Main";
import { api } from "../../services/api";
import { Form, SubmitButton } from "./styles";

interface Props {
  alert: string;
  setAlert: React.Dispatch<React.SetStateAction<string>>;
  repositories: Repository[];
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
}

export default function MainForm({
  alert,
  setAlert,
  repositories,
  setRepositories,
}: Props) {
  const [repoName, setRepoName] = useState("");
  const handleSubmit = useCallback(
    (e: any): void => {
      e.preventDefault();

      async function submit(): Promise<void> {
        setAlert("");
        try {
          if (!repoName) {
            return setAlert("Você precisa indicar um repositório!");
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
          setAlert("Não foi encontrado um repositório com esse nome!");
        }
      }

      submit();
    },
    [repoName, repositories]
  );

  function handleChangeValue(e: any): void {
    if (e.nativeEvent.data === " ") return;
    setRepoName(e.target.value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicione repositórios"
        value={repoName}
        onChange={handleChangeValue}
        style={alert ? { border: "1px solid red" } : {}}
      />

      <SubmitButton type="submit">
        <FaPlus color="#ffff" size={14} />
      </SubmitButton>
    </Form>
  );
}
