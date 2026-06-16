import { BookOpen, MessageCircle, GraduationCap, Languages, Heart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePracticeSettings } from "@/context/practice-settings";
import type { CEFRLevel, PracticeMode } from "@/data/sentences";

const MODES: { id: PracticeMode; label: string; icon: typeof BookOpen }[] = [
  { id: "translation", label: "Translation", icon: BookOpen },
  { id: "daily", label: "Daily Conversation", icon: MessageCircle },
  { id: "exam", label: "Exam Preparation", icon: GraduationCap },
];

const LEVELS: { id: CEFRLevel; label: string }[] = [
  { id: "A1", label: "Beginner" },
  { id: "A2", label: "Elementary" },
  { id: "B1", label: "Intermediate" },
  { id: "B2", label: "Upper-Int." },
  { id: "C1", label: "Advanced" },
];

export function AppSidebar() {
  const { mode, level, setMode, setLevel } = usePracticeSettings();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border/60">
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Languages className="h-5 w-5" strokeWidth={1.75} />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-display text-base font-semibold tracking-tight">Satzwerk</div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-sidebar-foreground/60">
                German Practice
              </div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-[10px] uppercase tracking-[0.18em]">
            Mode
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MODES.map((m) => {
                const Icon = m.icon;
                const active = m.id === mode;
                return (
                  <SidebarMenuItem key={m.id}>
                    <SidebarMenuButton
                      isActive={active}
                      onClick={() => setMode(m.id)}
                      tooltip={m.label}
                      className={cn(
                        "rounded-none border-l-2 border-transparent",
                        active && "border-sidebar-primary bg-sidebar-accent/60",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                      <span>{m.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-[10px] uppercase tracking-[0.18em]">
            CEFR Level
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {LEVELS.map((l) => {
                const active = l.id === level;
                return (
                  <SidebarMenuItem key={l.id}>
                    <SidebarMenuButton
                      isActive={active}
                      onClick={() => setLevel(l.id)}
                      tooltip={`${l.id} · ${l.label}`}
                      className={cn(
                        "rounded-none border-l-2 border-transparent",
                        active && "border-sidebar-primary bg-sidebar-accent/60",
                      )}
                    >
                      <span className="font-display w-6 text-xs font-semibold tracking-wider">
                        {l.id}
                      </span>
                      <span className="text-sidebar-foreground/70">{l.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="border-t border-sidebar-border/60">
          <div className="space-y-2 px-2 py-2 text-[11px] leading-relaxed text-sidebar-foreground/70">
            <p>
              Free, ad-free. Built for people learning German the lazy way.
            </p>
            <a
              href="https://paypal.me/tnblio0612"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-sidebar-primary hover:underline"
            >
              <Heart className="h-3 w-3" />
              Buy me a coffee
            </a>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
