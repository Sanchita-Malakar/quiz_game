// app/api/quiz/[id]/results/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;  // ✅ Await the params

    // Parse request body
    const body = await req.json();

    // Validate required fields
    const { playerName, score, total, timeTaken, avatar } = body;

    if (!playerName || score === undefined || total === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: playerName, score, and total" },
        { status: 400 }
      );
    }

    // Validate score is within range
    if (score < 0 || score > total) {
      return NextResponse.json(
        { error: "Score must be between 0 and total questions" },
        { status: 400 }
      );
    }

    // Validate timeTaken is a positive number
    if (timeTaken === undefined || timeTaken < 0) {
      return NextResponse.json(
        { error: "timeTaken must be a positive number" },
        { status: 400 }
      );
    }

    // Validate avatar is a valid emoji
    const validAvatars = ["🧑‍💻", "🌸", "🎧", "⭐", "✨", "🎉", "💀"];
    if (avatar && !validAvatars.includes(avatar)) {
      return NextResponse.json(
        { error: "Invalid avatar emoji" },
        { status: 400 }
      );
    }

    // Check if quiz exists
    const quiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Save player result to database
    const result = await prisma.playerResult.create({
      data: {
        quizId: id,
        playerName: playerName.trim(),
        score: score,
        total: total,
        timeTaken: Math.round(timeTaken),
        avatar: avatar || "⭐", // Default avatar
      },
    });

    // Return success response
    return NextResponse.json({
      success: true,
      result: {
        id: result.id,
        playerName: result.playerName,
        score: result.score,
        total: result.total,
        timeTaken: result.timeTaken,
        avatar: result.avatar,
      },
      message: "Result saved successfully",
    });
  } catch (error) {
    console.error("Save result error:", error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("foreign key constraint")) {
        return NextResponse.json(
          { error: "Invalid quiz ID" },
          { status: 400 }
        );
      }
      if (error.message.includes("unique constraint")) {
        return NextResponse.json(
          { error: "Result already exists for this player" },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to save result. Please try again." },
      { status: 500 }
    );
  }
}