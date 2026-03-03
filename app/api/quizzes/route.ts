// app/api/quizzes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate required fields
    if (!body.title || !body.questions || body.questions.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: title and questions" },
        { status: 400 }
      );
    }

    // Validate questions structure
    for (const question of body.questions) {
      if (!question.question || !question.options || question.options.length === 0) {
        return NextResponse.json(
          { error: "Each question must have a question text and at least one option" },
          { status: 400 }
        );
      }
    }

    // Use transaction to ensure data integrity (all or nothing)
    const result = await prisma.$transaction(async (tx: any) => {
      // 1. Create the Quiz
      const quiz = await tx.quiz.create({
        data: {
          title: body.title,
          author: body.author || "Quiz Creator",
          totalTime: body.totalTime || 20, // Default 20 seconds per question
          questions: {
            create: body.questions.map((q: any) => ({
              text: q.question,
              image: q.image || null,
              options: {
                create: q.options.map((optText: string, index: number) => ({
                  text: optText,
                  isCorrect: q.correctIndex === index,
                })),
              },
            })),
          },
        },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      return quiz.id;
    });

    // Return success response with quiz ID
    return NextResponse.json({
      success: true,
      quizId: result,
      message: "Quiz created successfully",
    });
  } catch (error) {
    console.error("Quiz creation error:", error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("foreign key constraint")) {
        return NextResponse.json(
          { error: "Database constraint violation" },
          { status: 400 }
        );
      }
      if (error.message.includes("unique constraint")) {
        return NextResponse.json(
          { error: "Quiz with this title already exists" },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to create quiz. Please try again." },
      { status: 500 }
    );
  }
}