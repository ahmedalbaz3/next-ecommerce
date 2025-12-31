import { NextRequest, NextResponse } from "next/server";
// CHANGE 1: Use a relative path instead of @ to rule out alias issues
import productsData from "../../../data/products.json";
import { TProduct } from "@/types/TProduct";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    const rawData: any = productsData;
    const actualProducts =
      rawData.products || (rawData.default && rawData.default.products);

    if (!actualProducts) {
      return NextResponse.json(
        {
          error: "Data structure mismatch",
          receivedKeys: Object.keys(rawData),
        },
        { status: 500 }
      );
    }

    const productsArray = actualProducts as TProduct[];

    const filteredProducts = productsArray.filter((product) => {
      const nameEn = product.name_en?.toLowerCase() || "";
      const nameAr = product.name_ar?.toLowerCase() || "";
      const descEn = product.description_en?.toLowerCase() || "";
      const descAr = product.description_ar?.toLowerCase() || "";
      const catId = product.categoryId?.toLowerCase() || "";

      return (
        nameEn.includes(query) ||
        nameAr.includes(query) ||
        descEn.includes(query) ||
        descAr.includes(query) ||
        catId.includes(query)
      );
    });

    return NextResponse.json(filteredProducts);
  } catch (error: any) {
    console.error("CRASH IN API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
