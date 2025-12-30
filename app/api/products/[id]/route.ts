import { NextRequest, NextResponse } from "next/server";
import productsData from "@/data/products.json";
import { TProduct } from "@/types/TProduct";

export async function GET(
  req: NextRequest, // Changed to NextRequest for better type support
  { params }: { params: Promise<{ id: string }> } // 1. Set params as a Promise
) {
  // 2. Await the params object
  const { id } = await params;

  const allProducts = productsData.products as TProduct[];

  // Find the product where the ID matches
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: `Product ${id} not found in ${productsData}` },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
