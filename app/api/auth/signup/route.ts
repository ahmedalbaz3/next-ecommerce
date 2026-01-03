import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "users.json");

    const fileData = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileData);

    const newUser = {
      id: `user-${Math.random()}-${Date.now()}`,
      name,
      email,
      role: "user",
      password,
    };

    const existingUser = data.users.find((u: any) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    data.users.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      {
        message: "User created successfully!",
        user: { name, email },
        token: `token-${newUser.id}-${Date.now()}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("File error:", error);
    return NextResponse.json(
      { error: "Failed to save user data" },
      { status: 500 }
    );
  }
}
