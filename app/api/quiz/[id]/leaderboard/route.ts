// app/api/quiz/[id]/leaderboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;  // ✅ Await the params

    // Fetch quiz with all questions and options
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    // Check if quiz exists
    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Fetch all player results for this quiz
    const results = await prisma.playerResult.findMany({
      where: { quizId: id },
      orderBy: [
        { score: "desc" },
        { timeTaken: "asc" },
      ],
    });

    // Transform data to match frontend expectations
    const transformedPlayers = results.map((result: typeof results[0]) => ({
      id: result.id,
      name: result.playerName,
      score: result.score,
      total: result.total,
      timeTaken: result.timeTaken,
      avatar: result.avatar,
    }));

    // Return complete leaderboard data
    return NextResponse.json({
      quizTitle: quiz.title,
      author: quiz.author,
      totalQuestions: quiz.questions.length,
      players: transformedPlayers,
    });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);

    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}