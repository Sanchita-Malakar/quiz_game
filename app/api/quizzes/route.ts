// app/api/quizzes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin Client (Server-side only)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server-side verification
);

export async function POST(req: Request) {
  try {
    // 1. Parse request body
    const body = await req.json();

    // 2. Validate required fields
    if (!body.title || !body.questions || body.questions.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: title and questions" },
        { status: 400 }
      );
    }

    // 3. Authenticate the User (Get User ID from Header)
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized: Missing token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // 4. Validate questions structure
    for (const question of body.questions) {
      if (!question.question || !question.options || question.options.length === 0) {
        return NextResponse.json(
          { error: "Each question must have a question text and at least one option" },
          { status: 400 }
        );
      }
    }

    // 5. Use transaction to ensure data integrity
    const result = await prisma.$transaction(async (tx: any) => {
      // 6. Create the Quiz (NOW WITH userId)
      const quiz = await tx.quiz.create({
        data: {
          title: body.title,
          author: body.author || "Quiz Creator",
          userId: user.id, // ✅ CRITICAL: Pass the authenticated user's ID
          totalTime: body.totalTime || 20,
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

    return NextResponse.json({
      success: true,
      quizId: result,
      message: "Quiz created successfully",
    });
  } catch (error) {
    console.error("Quiz creation error:", error);
    return NextResponse.json(
      { error: "Failed to create quiz. Please try again." },
      { status: 500 }
    );
  }
}