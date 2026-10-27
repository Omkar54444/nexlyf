import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function NotFoundComponent() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center py-24">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 max-w-4xl text-6xl md:text-8xl">This piece is missing.</h1>
      <p className="mt-6 max-w-md text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-primary">Back to home</Link>
        <Link to="/work" className="btn btn-outline">See our work</Link>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center py-24">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="mt-6 text-5xl md:text-7xl">This page didn't load.</h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <button onClick={() => { router.invalidate(); reset(); }} className="btn btn-primary">Try again</button>
        <a href="/" className="btn btn-outline">Go home</a>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NEXLYF — Creative Growth Studio" },
      { name: "description", content: "NEXLYF connects strategy, creativity and technology to help brands move forward." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f8f5ef" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-background focus:p-3">Skip to content</a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </QueryClientProvider>
  );
}
