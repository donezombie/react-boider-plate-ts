import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebarHandler } from "@/providers/SidebarProvider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Link } from "react-router-dom";
import BaseUrl from "@/consts/baseUrl";

export default function Navbar() {
  const { logout } = useAuth();
  const { isOpen, toggle } = useSidebarHandler();
  const [openPopover, setPopover] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between p-2 md:justify-end">
      {isOpen ? (
        <X
          className="hover:cursor-pointer hover:bg-gray-100 md:hidden"
          onClick={toggle}
        />
      ) : (
        <Menu
          className="hover:cursor-pointer hover:bg-gray-100 md:hidden"
          onClick={toggle}
        />
      )}

      <Popover open={openPopover} onOpenChange={setPopover}>
        <PopoverTrigger asChild>
          <div className="navbar__avatar flex items-center gap-2 rounded-md hover:cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="mb-1 text-sm font-medium leading-none">
                donezombie
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                donezombie@gmail.com
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="mr-2 mt-2 flex max-w-[200px] flex-col p-2">
          {[
            {
              label: "Change password",
              href: BaseUrl.ChangePassword,
              function: () => {},
            },
            {
              label: "Log out",
              function: () => {
                logout();
              },
            },
          ].map((f) => {
            if (f.href) {
              return (
                <Link
                  to={f.href}
                  className="navbar__each__menu is-hover p-1 px-2 text-sm"
                  key={f.label}
                >
                  {f.label}
                </Link>
              );
            }

            return (
              <p
                onClick={f.function}
                className="navbar__each__menu is-hover p-1 px-2 text-sm"
                key={f.label}
              >
                {f.label}
              </p>
            );
          })}
        </PopoverContent>
      </Popover>
    </nav>
  );
}
