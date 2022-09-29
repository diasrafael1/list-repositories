import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ListIssues from "../../components/ListIssues";
import { api } from "../../services/api";
import { Container, Owner, BackButton } from "./styles";

export default function Repository() {
  const { repoName } = useParams();
  const [repoData, setRepoData] = useState({
    name: "",
    description: "",
    owner: {
      avatar_url: "",
    },
  });

  useEffect(() => {
    async function handleGetDetails() {
      const response = await api.get(`/repos/${repoName}`);

      setRepoData(response.data);
    }
    handleGetDetails();
  }, [repoName]);

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>

      <Owner>
        <img src={repoData.owner.avatar_url} />
        <h1>{repoData.name}</h1>
        <p>{repoData.description}</p>
      </Owner>

      <ListIssues />
    </Container>
  );
}
