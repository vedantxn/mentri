"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardUserButton } from "./dashboard-user-button";
import { useSidebarContext } from "@/lib/sidebar-context";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { isCollapsed } = useSidebarContext();

  return (
    <aside className={cn(
      "h-screen bg-primary/5 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 px-4 flex items-center border-b border-slate-200 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg dark:bg-white flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="mentri.ai"
              width={30}
              height={30}
              className="hover:rotate-180 transition-all duration-200"
              priority
            />
          </div>
          {!isCollapsed && (
            <span className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight truncate hover:text-primary">
              mentri.ai
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {firstSection.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-2.5 h-9 rounded-md text-[14px] font-medium transition-colors font-semibold ",
                  isActive
                    ? "bg-primary/10 dark:bg-primary/10 text-primary dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon 
                  className={cn(
                    "w-[20px] h-[20px] flex-shrink-0",
                    isActive ? "text-primary dark:text-white" : "text-slate-500 dark:text-slate-500"
                  )} 
                  strokeWidth={2}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>

        <div className="my-3 border-t border-slate-200 dark:border-slate-800" />

        <div className="space-y-0.5">
          {secondSection.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 h-10 rounded-lg text-[14px] font-medium transition-all duration-200 border",
                  isActive
                    ? "bg-amber-200 border-amber-400 text-amber-950 shadow-lg shadow-amber-500/20"
                    : "bg-amber-200/90 border-amber-200 text-amber-950 hover:bg-amber-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-300/20",
                  isCollapsed && "justify-center px-2"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon 
                  className="w-[18px] h-[18px] flex-shrink-0" 
                  strokeWidth={2}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="h-16 p-3 border-t border-slate-200 dark:border-slate-800 flex items-center">
        <DashboardUserButton />
      </div>
    </aside>
  );
};
