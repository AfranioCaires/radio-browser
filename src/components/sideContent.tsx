import { Input } from "@/components/ui/input";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ThemeModeToggle } from "./mode-toggle";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Discover</SidebarGroupLabel>
            <SidebarMenu>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                  type="text"
                  id="searchRadios"
                  placeholder="Busque aqui"
                />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
