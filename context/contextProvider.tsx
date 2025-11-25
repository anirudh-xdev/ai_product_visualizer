import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

interface SidebarContextType {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  isActive: (path: string) => boolean;
  navigate: ReturnType<typeof useNavigate>;
}
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <SidebarContext.Provider
      value={{ mobileOpen, setMobileOpen, isActive, navigate }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }

  return context;
}
