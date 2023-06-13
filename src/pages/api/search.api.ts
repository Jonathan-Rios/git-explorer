import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, codeSnippet } = req.query;

  try {
    const repositories = await prisma.repository.findMany({
      where: {
        userId: String(userId),
        files: {
          some: {
            content: {
              contains: String(codeSnippet),
            },
          },
        },
      },
    });

    const formattedRepositories = repositories.map((repository) => ({
      id: repository.id,
      name: repository.name,
      description: repository.description,
    }));

    return res.status(200).json(formattedRepositories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
