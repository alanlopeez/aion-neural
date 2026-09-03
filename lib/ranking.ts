import { prisma } from "@/lib/prisma";

export interface RankedUser {
  id: string;
  name: string;
  publicName: string;
  identityType: string;
  alias: string | null;
  role: string;
  totalAnswers: number;
  totalCommentsReceived: number;
  averageCommentsPerAnswer: number;
  score: number;
  visibility: {
    showEmail: boolean;
    email: string | null;
    linkedinUrl: string | null;
    genericSocialUrl: string | null;
    websiteUrl: string | null;
  } | null;
}

export async function getLeaderboard(): Promise<RankedUser[]> {
  try {
    const users = await prisma.user.findMany({
      include: {
        visibility: true,
        answers: {
          include: {
            comments: {
              select: {
                authorId: true,
              },
            },
          },
        },
      },
    });

    const ranked: RankedUser[] = users.map((user) => {
      const totalAnswers = user.answers.length;

      let totalCommentsReceived = 0;
      user.answers.forEach((ans) => {
        // Count comments made by other scientists
        const commentsByOthers = ans.comments.filter(
          (c) => c.authorId !== user.id
        ).length;
        totalCommentsReceived += commentsByOthers;
      });

      const averageCommentsPerAnswer =
        totalAnswers > 0 ? totalCommentsReceived / totalAnswers : 0;

      // Formula: (Suma total de Respuestas) + (Promedio de comentarios/debates en sus respuestas)
      const rawScore = totalAnswers + averageCommentsPerAnswer;
      const score = Math.round(rawScore * 100) / 100;

      const publicName =
        user.publicIdentityType === "ALIAS" && user.alias
          ? user.alias
          : user.name;

      return {
        id: user.id,
        name: user.name,
        publicName,
        identityType: user.publicIdentityType,
        alias: user.alias,
        role: user.role,
        totalAnswers,
        totalCommentsReceived,
        averageCommentsPerAnswer: Math.round(averageCommentsPerAnswer * 100) / 100,
        score,
        visibility: user.visibility
          ? {
              showEmail: user.visibility.showEmail,
              email: user.visibility.showEmail ? user.email : null,
              linkedinUrl: user.visibility.linkedinUrl,
              genericSocialUrl: user.visibility.genericSocialUrl,
              websiteUrl: user.visibility.websiteUrl,
            }
          : null,
      };
    });

    // Sort descending by score, then totalAnswers
    ranked.sort((a, b) => b.score - a.score || b.totalAnswers - a.totalAnswers);

    return ranked;
  } catch (err) {
    console.error("Error al calcular ranking:", err);
    return [];
  }
}
