import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import { AppSidebar } from "@/components/sidebar/side-content";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}
