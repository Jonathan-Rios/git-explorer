import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import dayjs from "dayjs";

interface GitHubRepositoryResponse {
  name: string;
  private: boolean;
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  axios.defaults.headers.common[
    "Authorization"
  ] = `token ${process.env.GITHUB_TOKEN}`;

  const { username, userId } = req.body;

  try {
    let page = 1;
    let repositories: GitHubRepositoryResponse[] = [];

    // ? Pega todos os repositórios do usuário
    while (true) {
      const response = await axios.get<GitHubRepositoryResponse[]>(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            per_page: 100, // Max number of repositories per page (GitHub API allows up to 100)
            page: page,
          },
        }
      );

      if (response.status !== 200) {
        return res
          .status(500)
          .json({ error: "Failed to fetch user repositories" });
      }

      const pageRepositories = response.data;

      if (pageRepositories.length === 0) {
        break; // No more repositories, exit the loop
      }

      repositories = repositories.concat(pageRepositories);
      page++;
    }

    if (repositories.length === 0) {
      return res.status(404).json({ error: "User has no repositories" });
    }

    // ? Busca os readmes de cada repositório
    for (const repo of repositories) {
      const { name: repositoryName, description } = repo;

      try {
        const readmeResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repositoryName}/readme`,
          {
            headers: {
              Accept: "application/vnd.github.VERSION.raw",
            },
          }
        );

        if (readmeResponse.status !== 200) {
          console.log(
            `Failed to fetch Readme for repository: ${repositoryName}`
          );
          continue; // Ignore the repository and continue to the next one
        }

        const readmeContent = readmeResponse.data;

        // ? Salva o repositório e o readme no banco de dados
        await prisma.repository.upsert({
          where: { name: repositoryName },
          create: {
            name: repositoryName,
            description: description,
            lastReadAt: dayjs().format(),
            userId: userId,
            files: {
              create: [
                {
                  name: "Readme",
                  path: "Readme.md",
                  content: readmeContent,
                },
              ],
            },
          },
          update: {
            lastReadAt: dayjs().format(),
          },
        });

        // ? Busca o repositório no banco de dados
        const repository = await prisma.repository.findUnique({
          where: { name: repositoryName },
        });

        // ? Busca o readme do repositório no banco de dados
        const readmeFile = await prisma.file.findFirst({
          where: {
            repositoryId: repository?.id,
            name: "Readme",
            path: "Readme.md",
          },
        });

        // ? Se o readme já existir, atualiza o conteúdo dele
        if (readmeFile) {
          await prisma.file.update({
            where: { id: readmeFile.id },
            data: { content: readmeContent },
          });
        } else {
          // ? Se o readme não existir, cria um novo
          await prisma.file.create({
            data: {
              name: "Readme",
              path: "Readme.md",
              content: readmeContent,
              repository: { connect: { id: repository?.id } },
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    return res
      .status(200)
      .json({ message: "Repositories and Readmes saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
