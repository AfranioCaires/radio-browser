import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";
import { AppSidebar } from "@/components/sidebar/side-content";
import { PlayerProvider } from "./player-context";
import { FavoritesProvider } from "./favorites-context";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PlayerProvider>
          <FavoritesProvider>
            <AppSidebar />
            <Toaster theme="system" />
            {children}
          </FavoritesProvider>
        </PlayerProvider>
      </ThemeProvider>
    </SidebarProvider>
  );
}
