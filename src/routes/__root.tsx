import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { PracticeSettingsProvider, usePracticeSettings } from "@/context/practice-settings";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lazy German" },
      { name: "description", content: "A Website to practice German in a lazy Way" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lazy German" },
      { property: "og:description", content: "A Website to practice German in a lazy Way" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lazy German" },
      { name: "twitter:description", content: "A Website to practice German in a lazy Way" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f8b4c041-a02b-4b23-8fff-1ea0fce0ad04/id-preview-679602a1--7c60032d-7f0a-4fce-bd73-eb1726d13b0c.lovable.app-1780596832414.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f8b4c041-a02b-4b23-8fff-1ea0fce0ad04/id-preview-679602a1--7c60032d-7f0a-4fce-bd73-eb1726d13b0c.lovable.app-1780596832414.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
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
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const MODE_LABELS: Record<string, string> = {
  translation: "Translation",
  daily: "Daily Conversation",
  exam: "Exam Preparation",
};

function TopBar() {
  const { mode, level } = usePracticeSettings();
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6">
      <SidebarTrigger className="-ml-1" />
      <div className="h-5 w-px bg-border" />
      <nav className="flex items-baseline gap-2 font-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>Satzwerk</span>
        <span className="text-border">/</span>
        <span className="text-foreground/80">{MODE_LABELS[mode]}</span>
        <span className="text-border">/</span>
        <span className="text-primary">{level}</span>
      </nav>
      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label="Toggle theme"
          className="h-8 w-8 rounded-full"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}

function AppShell() {
  return (
    <PracticeSettingsProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background text-foreground">
          <AppSidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <TopBar />
            <main className="flex-1">
              <Outlet />
            </main>
            <footer className="border-t border-border px-6 py-6 text-center text-xs leading-relaxed text-muted-foreground">
              <p className="mx-auto max-w-2xl">
                Free web app, no BS. It's 2026 — education shouldn't be locked behind a paywall.
                If this helps,{" "}
                <a
                  href="https://paypal.me/tnblio0612"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  buy me a coffee via PayPal
                </a>
                . Good luck on your way to Germany — hope it all goes smoothly.
              </p>
            </footer>
          </div>
        </div>
      </SidebarProvider>
    </PracticeSettingsProvider>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
