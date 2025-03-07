import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebarHandler } from "@/providers/SidebarProvider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { useAuth } from "@/providers/AuthenticationProvider";
import { Link } from "react-router-dom";
import BaseUrl from "@/consts/baseUrl";
import Sidebar from "../Sidebar";
import { useTranslation } from "react-i18next";
import { upperCase } from "lodash";
import { Badge } from "../ui/badge";

export default function Navbar() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { isOpen, toggle } = useSidebarHandler();
  const { user, isAdmin } = useAuth();

  const [openPopover, setPopover] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between p-2 md:justify-end">
      <Popover open={isOpen} onOpenChange={toggle}>
        <PopoverTrigger asChild>
          {isOpen ? (
            <X className="hover:cursor-pointer hover:bg-gray-100 md:hidden" />
          ) : (
            <Menu className="hover:cursor-pointer hover:bg-gray-100 md:hidden" />
          )}
        </PopoverTrigger>
        <PopoverContent className="mt-[10px] w-auto border-0 p-0">
          <Sidebar forMobile />
        </PopoverContent>
      </Popover>

      <Popover open={openPopover} onOpenChange={setPopover}>
        <PopoverTrigger asChild>
          <div className="navbar__avatar flex items-center gap-2 rounded-md hover:cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcnee.png" />
              <AvatarFallback>{upperCase(user?.username?.[0])}</AvatarFallback>
            </Avatar>
            <div>
              <p className="mb-1 text-sm font-medium leading-none">
                {user?.username}{" "}
                {isAdmin && <Badge className="mr-2">Admin</Badge>}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="mr-2 mt-2 flex max-w-[200px] flex-col p-2">
          {[
            {
              label: t("settings"),
              href: BaseUrl.Settings,
              function: () => {
                setPopover(false);
              },
            },
            {
              label: t("logout"),
              function: () => {
                setPopover(false);
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
                  onClick={f.function}
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
