// app/routes/__root.tsx
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Large data transfer example",
      },
    ],
  }),
  component: RootComponent,
});

export function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body style={{ overflow: "hidden" }}>
        <main
          style={{
            flex: 1,
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </main>
        <Scripts />
      </body>
    </html>
  );
}
