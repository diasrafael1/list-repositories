import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import {
  Container,
  Owner,
  BackButton,
  IssuesList,
  PageActions,
} from "./styles";

interface RepoData {
  name: string;
  description: string;
  avatar_url: string;
}

export default function Repository() {
  const { repoName } = useParams();
  const [repoData, setRepoData] = useState<RepoData>({
    name: "",
    description: "",
    avatar_url: "",
  });
  const [issuesData, setIssuesData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function handleGetDetails() {
      const [responseRepoData, responseIssuesData] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setRepoData({
        name: responseRepoData.data.name,
        description: responseRepoData.data.description,
        avatar_url: responseRepoData.data.owner.avatar_url,
      });
      setIssuesData(responseIssuesData.data);
    }
    handleGetDetails();
  }, [repoName]);

  useEffect(() => {
    async function handleLoadIssues() {
      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state: "open",
          page,
          per_page: 5,
        },
      });
      setIssuesData(response.data);
    }
    handleLoadIssues();
  }, [repoName, page]);

  function handlePage(action: string) {
    setPage(action === "back" ? page - 1 : page + 1);
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>

      <Owner>
        <img src={repoData.avatar_url} />
        <h1>{repoData.name}</h1>
        <p>{repoData.description}</p>
      </Owner>

      <IssuesList>
        {issuesData.map((issue) => {
          return (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>

                  {issue.labels.map((label: { id: number; name: string }) => {
                    return <span key={String(label.id)}>{label.name}</span>;
                  })}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          );
        })}
      </IssuesList>

      <PageActions>
        <button onClick={() => handlePage("back")} disabled={page < 2 && true}>
          Voltar
        </button>
        <button onClick={() => handlePage("next")}>Proxima</button>
      </PageActions>
    </Container>
  );
}
