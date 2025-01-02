import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useSidebar(): boolean {
  const path = usePathname();
  const [visible, setIsVisible] = useState(path === "/");

  useEffect(() => {
    setIsVisible(path === "/");
  }, [path]);

  return visible;
}
