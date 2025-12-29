import { http, HttpResponse } from "msw";
import { products, categories, users } from "./data";

interface RegisterBody {
  email: string;
  name: string;
  // add other fields like password if needed
}

export const handlers = [
  // Products
  http.get("/api/products", () => HttpResponse.json(products)),
  http.get("/api/products/:id", ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(product);
  }),

  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);
    const idsParam = url.searchParams.get("ids");

    if (idsParam) {
      const ids = idsParam.split(",");
      const filtered = products.filter((p) => ids.includes(p.id));
      return HttpResponse.json(filtered);
    }
    return HttpResponse.json(products);
  }),

  // Categories

  http.get("/api/categories", () => HttpResponse.json(categories)),
  http.get("/api/categories/:slug", ({ params }) => {
    console.log("MSW handler called with slug:", params.slug);
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) return new HttpResponse(null, { status: 404 });

    const categoryProducts = products.filter(
      (p) => p.categoryId === category.id
    );

    return HttpResponse.json({ category, products: categoryProducts });
  }),

  // Auth
  http.post("/api/auth/login", async ({ request }: { request: Request }) => {
    const { email } = await request.json();
    const user = users.find((u) => u.email === email);
    if (!user) return new HttpResponse(null, { status: 401 });
    return HttpResponse.json({ user, token: "mock-jwt-token" });
  }),
  http.get("/api/auth/me", ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) return new HttpResponse(null, { status: 401 });
    return HttpResponse.json(users[0]);
  }),

  http.post("/api/auth/register", async ({ request }) => {
    const newUser = (await request.json()) as RegisterBody;

    // Create a mock user object
    const user = {
      id: `u${users.length + 1}`,
      email: newUser.email,
      name: newUser.name,
      role: "user",
    };

    return HttpResponse.json(
      { user, token: "mock-jwt-token" },
      { status: 201 }
    );
  }),

  // Orders
  http.get("/api/user/orders", ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) return new HttpResponse(null, { status: 401 });
    return HttpResponse.json([
      { id: "o1", total: 49.99, status: "processing" },
      { id: "o2", total: 19.99, status: "delivered" },
    ]);
  }),
];

// get all cetegories
http.get("/api/categories", () => {
  return HttpResponse.json(categories);
});

// get categories by slug
http.get("/api/categories/:slug", ({ params }) => {
  console.log("MSW handler called with slug:", params.slug);

  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return new HttpResponse(null, { status: 404 });
  const categoryProducts = products.filter((p) => p.categoryId === category.id);
  return HttpResponse.json({ category, products: categoryProducts });
}),
  // get product by id
  http.get("/api/products/:id", ({ params }) => {
    const product = products.find((p) => p.id === params.id);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  });

// profile
http.get("/api/auth/me", ({ request }) => {
  const auth = request.headers.get("Authorization");

  if (!auth) {
    return new HttpResponse(null, { status: 401 });
  }

  return HttpResponse.json(users[0]);
});

// protected routes
http.get("/api/user/orders", ({ request }) => {
  const auth = request.headers.get("Authorization");

  if (!auth) {
    return new HttpResponse(null, { status: 401 });
  }

  return HttpResponse.json([
    { id: "o1", total: 49.99, status: "processing" },
    { id: "o2", total: 19.99, status: "delivered" },
  ]);
});
