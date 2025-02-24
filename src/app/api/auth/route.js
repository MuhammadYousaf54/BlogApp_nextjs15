import { NextResponse } from "next/server";
import { createSession, deleteSession } from "@/lib/session";
import { getAuthUser } from "@/lib/getAuthUser";

export async function GET() {
  const authUser = await getAuthUser();
  return NextResponse.json({ user: authUser });
}

export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    await createSession(userId);
    return NextResponse.json({ message: "Session created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  await deleteSession();
  return NextResponse.json({ message: "Logged out successfully" });
}
