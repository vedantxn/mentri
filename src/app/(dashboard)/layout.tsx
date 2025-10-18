"use client";

import { SidebarProvider } from "@/lib/sidebar-context";
import { DashboardSidebar } from "@/modules/dashboard/ui/dashboard-sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/dashboard-navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
