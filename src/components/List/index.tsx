import { useCallback } from "react";
import { FaBars, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Repository } from "../../pages/Main";
import { DeleteButton, List } from "./styles";

interface Props {
  repositories: Repository[];
  setRepositories: React.Dispatch<React.SetStateAction<Repository[]>>;
}

export default function MainList({ repositories, setRepositories }: Props) {
  const handleDelete = useCallback(
    (repoName: string): void => {
      const find = repositories.filter((repo) => repo.name !== repoName);
      setRepositories(find);
    },
    [repositories]
  );

  return (
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
            <Link to={`/repositorios/${encodeURIComponent(repository.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        );
      })}
    </List>
  );
}
