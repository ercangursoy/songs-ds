import { useState, useRef, useCallback, useEffect } from "react";
import { useClickOutside } from "./useClickOutside";

interface UseDropdownOptions {
  onClose?: () => void;
}

const EXIT_DURATION = 100;

export function useDropdown({ onClose }: UseDropdownOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const close = useCallback(() => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      onClose?.();
      triggerRef.current?.focus();
    }, EXIT_DURATION);
  }, [isOpen, isClosing, onClose]);

  const open = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, close, open]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useClickOutside(wrapperRef, close);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const visible = isOpen || isClosing;

  return {
    isOpen: visible,
    isClosing,
    wrapperRef,
    triggerRef,
    open,
    close,
    toggle,
  } as const;
}
