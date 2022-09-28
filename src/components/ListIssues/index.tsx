import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { FilterActions, IssuesList, PageActions } from "./styles";

export default function ListIssues() {
  const { repoName } = useParams();
  const [issuesData, setIssuesData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState("all");
  const filterButtons = [
    {
      state: "all",
      label: "Todas",
    },
    {
      state: "open",
      label: "Abertas",
    },
    {
      state: "closed",
      label: "Fechadas",
    },
  ];

  useEffect(() => {
    async function handleLoadIssues() {
      const response = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          page,
          per_page: 5,
        },
      });
      setIssuesData(response.data);
    }
    handleLoadIssues();
  }, [repoName, page, state]);

  function handleFilter(action: string): void {
    setState(action);
  }

  function handlePage(action: string): void {
    setPage(action === "back" ? page - 1 : page + 1);
  }

  return (
    <>
      <FilterActions>
        <span>Filtros:</span>
        {filterButtons.map((button) => {
          return (
            <button
              onClick={() => handleFilter(button.state)}
              style={state === button.state ? { background: "#0071db" } : {}}
            >
              {button.label}
            </button>
          );
        })}
      </FilterActions>
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
    </>
  );
}
