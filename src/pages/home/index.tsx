import { AppLayout } from "@/layout";
import {
  Container,
  Content,
  Form,
  RepositoriesList,
  Repository,
} from "./styles";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { api } from "@/lib/api";

interface Repository {
  id: string;
  name: string;
  description: string;
}

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [search, setSearch] = useState<string>("");

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (search.trim() === "") {
      return;
    }

    try {
      await api
        .get<Repository[]>("/search", {
          params: {
            codeSnippet: search,
            userId: "05690e69-37f7-4925-be8b-eacfb34ca819",
          },
        })
        .then((response) => {
          setRepositories(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppLayout>
      <Container>
        <Form onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">
            <MagnifyingGlass weight="bold" />
            Buscar
          </button>
        </Form>

        <Content>
          <RepositoriesList>
            {!!repositories.length &&
              repositories.map((repository) => (
                <Repository key={repository.id}>
                  <h4>{repository.name}</h4>
                  <p>{repository.description || "teste"}</p>
                </Repository>
              ))}
          </RepositoriesList>
        </Content>
      </Container>
    </AppLayout>
  );
}
