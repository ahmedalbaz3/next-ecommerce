type Size = "S" | "M" | "L" | "XL";

export interface TProduct {
  id: string;
  name_en: string;
  name_ar: string;
  price: number;
  image: string;
  inStock: boolean;
  totalQuantity?: number;
  sizes?: Size[];
  description_en: string;
  description_ar: string;
  categoryId?: string;
  oldPrice?: number;
}
