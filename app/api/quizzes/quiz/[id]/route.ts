// app/api/quiz/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch quiz with all questions and options
    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
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

    // Transform data to match frontend expectations
    const transformedQuiz = {
      id: quiz.id,
      title: quiz.title,
      author: quiz.author,
      totalTime: quiz.totalTime,
      questions: quiz.questions.map((q: typeof quiz.questions[number]) => ({
        id: q.id,
        text: q.text,
        image: q.image,
        options: q.options.map((o: typeof q.options[number]) => o.text),
        correctIndex: q.options.findIndex((o: typeof q.options[number]) => o.isCorrect),
      })),
    };

    return NextResponse.json(transformedQuiz);
  } catch (error) {
    console.error("Quiz fetch error:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}