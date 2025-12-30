import { NextResponse } from "next/server";
import usersData from "@/data/users.json";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Find user in your JSON file
    const user = usersData.users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 2. Return user data (excluding password for security)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
