import { ReactNode, useContext, useLayoutEffect } from "react";
import { ModalContext } from "../../page";

export function ModalTrigger({ children }: { children: ReactNode }) {
  const { triggerRef, openState } = useContext(ModalContext);

  const [isOpen, setIsOpen] = openState;

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen(true);
  }

  useLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div ref={triggerRef} onClick={handleClick}>
      {children}
    </div>
  );
}
