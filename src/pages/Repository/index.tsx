import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { Container, Owner, BackButton, IssuesList } from "./styles";

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
    </Container>
  );
}
