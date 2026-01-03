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
      id: `u${data.users.length + 1}`,
      name,
      email,
      role: "user",
      password,
    };

    data.users.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(
      { message: "User created successfully!", user: { name, email } },
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
