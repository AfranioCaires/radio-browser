import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SearchRadios } from "../sidebar-search";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="overflow-y-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Buscar rádios</SidebarGroupLabel>
            <SidebarMenu>
              <SearchRadios />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
