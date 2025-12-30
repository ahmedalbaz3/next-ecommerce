import { NextResponse } from "next/server";
// Use a relative path to go up to the root data folder
import products from "@/data/products.json";
export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
