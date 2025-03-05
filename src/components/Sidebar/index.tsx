import useResponsive from "@/hooks/useResponsive";
import { cn } from "@/lib/utils";
import { useSidebarHandler } from "@/providers/SidebarProvider";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isOpen } = useSidebarHandler();
  const { isMobile, isTablet } = useResponsive();

  return (
    <div
      className={cn(
        "component:Sidebar  w-[--sidebar-width] bg-white p-2",
        isMobile || isTablet ? "absolute top-14" : "hidden md:block"
      )}
      style={{
        display: isMobile || isTablet ? (isOpen ? "block" : "none") : undefined,
      }}
    >
      <div className="flex h-full w-full flex-col rounded-md border p-1 shadow-md">
        <div className="side-bar__logo px-2 pt-2">
          <h3 className="text-xl">Logo comany here</h3>
        </div>

        <div className="side-bar__menu mt-8">
          <h6 className="mb-2 px-3 text-sm text-gray-500">General</h6>
          {[
            {
              label: "Dashboard",
              href: "/",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"></path>
                  <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"></path>
                  <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"></path>
                  <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"></path>
                </svg>
              ),
            },
            {
              label: "Task",
              href: "/",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8"></path>
                  <path d="M14 19l2 2l4 -4"></path>
                  <path d="M9 8h4"></path>
                  <path d="M9 12h2"></path>
                </svg>
              ),
            },
            {
              label: "Apps",
              href: "/",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"></path>
                  <path d="M2 13.5v5.5l5 3"></path>
                  <path d="M7 16.545l5 -3.03"></path>
                  <path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"></path>
                  <path d="M12 19l5 3"></path>
                  <path d="M17 16.5l5 -3"></path>
                  <path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5"></path>
                  <path d="M7 5.03v5.455"></path>
                  <path d="M12 8l5 -3"></path>
                </svg>
              ),
            },
            {
              label: "Users",
              href: "/",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                </svg>
              ),
            },
          ].map((el) => {
            return (
              <Link
                to={el.href}
                className="side-bar__menu__item flex items-center gap-2 px-3 py-2 text-sm"
              >
                {el.icon} {el.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
