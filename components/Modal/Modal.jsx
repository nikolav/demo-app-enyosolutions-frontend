import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "../icons";
import PortalOverlays from "../PortalOverlays/PortalOverlays";
//
// won't work 100% if placed inside another `motion.<element>`
export default function Modal({ isOpen, onClose, children }) {
  const isWindow = "undefined" !== typeof window;
  const keyup_ = ({ keyCode }) => 27 === keyCode && onClose();
  useEffect(() => {
    if (isOpen && isWindow) window.addEventListener("keyup", keyup_);

    return () => {
      if (isWindow) {
        window.removeEventListener("keyup", keyup_);
      }
    };
  }, [isOpen]);
  //
  return (
    <PortalOverlays end={true}>
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              zIndex: 123,
            }}
            className="fixed inset-0 bg-slate-500/50 backdrop-blur-md"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 1,
                y: 122,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  duration: 0.24,
                },
              }}
              exit={{
                opacity: 0,
                scale: 1.24,
                transition: {
                  duration: 0.12,
                },
              }}
              className="absolute overflow-hidden bg-white inset-0 sm:shadow-md sm:inset-6 sm:rounded-2xl md:inset-x-16 lg:inset-x-52"
            >
              <MdClose onClick={onClose} className="icon-close" />
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PortalOverlays>
  );
}
