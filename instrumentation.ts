export async function register() {
  console.log("!!! Instrumentation registered !!!");
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    const { server } = await import("./mocks/node");
    server.listen({ onUnhandledRequest: "bypass" });
  }
}
