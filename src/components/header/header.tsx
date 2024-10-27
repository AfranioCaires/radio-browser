import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-50 px-4 py-2 bg-background/80 backdrop-blur-md border-b">
      <div className="flex items-center">
        <div className="flex-1">
          {isMobile && <SidebarTrigger className="h-6 w-6" />}
        </div>
        <div className="flex justify-center">
          <div className="text-lg font-bold md:text-xl">Radio Browser</div>
        </div>
        <div className="flex-1 flex justify-end">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
