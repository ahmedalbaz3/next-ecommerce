// Fetch all products
export async function fetchProducts() {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json(); // returns the products array
}

// Fetch a product by ID
export async function fetchProductById(id: string) {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json(); // returns single product object
}

export async function fetchProductsByIds(ids: string[]) {
  if (ids.length === 0) return [];
  const res = await fetch(`/api/products?ids=${ids.join(",")}`);
  if (!res.ok) throw new Error("Products not found");
  return res.json();
}

// Fetch all categories
export async function fetchCategories() {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json(); // returns categories array
}

// Fetch category by slug
export async function fetchCategoryBySlug(slug: string) {
  const res = await fetch(`/api/categories/${slug}`);
  console.log(slug);
  if (!res.ok) throw new Error("Category not found");
  return res.json(); // returns { category, products }
}

// Fetch user profile (protected route)
export async function fetchProfile(token: string) {
  const res = await fetch("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json(); // returns user object
}
