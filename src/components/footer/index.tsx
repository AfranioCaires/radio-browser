import { Github, Linkedin, Mail } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export function Footer() {
  return (
    <footer className="py-2 mx-auto">
      <HoverCard>
        <Separator className="my-4" />
        <HoverCardTrigger asChild>
          <div className="flex px-4 container mx-auto justify-end space-x-4 lg:mt-0">
            <a href={"https://github.com/afraniocaires"}>
              <Github />
            </a>
            <a href={"https://linkedin.com/in/afraniocaires"}>
              <Linkedin />
            </a>
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="end" className="flex justify-end w-70">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/afraniocaires.png" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@afraniocaires</h4>
              <p className="text-sm">Desenvolvedor Front-end.</p>
              <div className="flex items-center pt-2">
                <Mail className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  <a href="mailto: afraniomcaires@gmail.com">
                    afraniomcaires@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </footer>
  );
}
