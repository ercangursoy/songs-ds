import { useState, useRef, useCallback, useEffect } from 'react';
import { useClickOutside } from './useClickOutside';

interface UseDropdownOptions {
  onClose?: () => void;
}

export function useDropdown({ onClose }: UseDropdownOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      setIsOpen(true);
    }
  }, [isOpen, close]);

  useClickOutside(wrapperRef, close);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  return { isOpen, wrapperRef, open, close, toggle } as const;
}
