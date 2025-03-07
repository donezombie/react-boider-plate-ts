import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface SidebarContextI {
  isOpen?: boolean;
  toggle?: () => void;
}

const SidebarContext = createContext<SidebarContextI>({
  isOpen: false,
  toggle: () => {},
});

export const useSidebarHandler = () => useContext(SidebarContext);

const SidebarProvider = ({ children }: { children: any }) => {
  //! State
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      toggle,
    }),
    [isOpen, toggle]
  );

  //! Render
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export default SidebarProvider;
