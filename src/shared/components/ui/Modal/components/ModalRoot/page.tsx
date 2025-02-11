import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "../../page";
import stl from "./style.module.scss";

interface ModalProps {
  children: ReactNode;
  title: string;
}

export function ModalRoot({ children, title }: ModalProps) {
  const { openState, modalRef } = useContext(ModalContext);
  const [isOpen, setIsOpen] = openState;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className={stl.bg} style={{ top: window.scrollY }}>
          <motion.div
            className={stl.modal}
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={stl.modal_close}
              onClick={() => setIsOpen(false)}
            >
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.93934 2.08077C2.52513 1.45224 3.47487 1.45224 4.06066 2.08077L9 7.38049L13.9393 2.08077C14.5251 1.45224 15.4749 1.45224 16.0607 2.08077C16.6464 2.7093 16.6464 3.72834 16.0607 4.35686L11.1213 9.65659L16.0607 14.9563C16.6464 15.5848 16.6464 16.6039 16.0607 17.2324C15.4749 17.8609 14.5251 17.8609 13.9393 17.2324L9 11.9327L4.06066 17.2324C3.47487 17.8609 2.52513 17.8609 1.93934 17.2324C1.35355 16.6039 1.35355 15.5848 1.93934 14.9563L6.87868 9.65659L1.93934 4.35686C1.35355 3.72834 1.35355 2.7093 1.93934 2.08077Z"
                  fill="#707579"
                />
              </svg>
            </button>
            <h4 className={stl.modal_title}>{title}</h4>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
