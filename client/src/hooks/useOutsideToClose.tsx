import { useState, useEffect, RefObject } from "react";

const useOutsideToClose = (menuRef: RefObject<HTMLDivElement>) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return { open, setOpen };
};

export default useOutsideToClose;
