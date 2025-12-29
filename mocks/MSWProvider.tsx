"use client";
import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Only run in development
      if (process.env.NODE_ENV === "development") {
        const { worker } = await import("./browser");
        // Start and wait for the worker
        await worker.start({
          onUnhandledRequest: "bypass",
        });
      }
      setReady(true);
    };
    init();
  }, []);

  if (!ready) return null; // Show nothing (or a loader) until MSW is active

  return <>{children}</>;
}
