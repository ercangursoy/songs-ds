import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { CloseIcon } from "@/icons";
import { Button } from "@/components";
import { useFocusTrap } from "@/hooks";
import { designNoteGroups, totalEnhancementCount } from "@/data/designNotes";
import styles from "./DesignNotes.module.css";

export interface DesignNotesProps {
  children?: ReactNode;
}

export function DesignNotes({ children }: DesignNotesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, isOpen);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  return (
    <>
      <Button
        variant="primary"
        className={styles.trigger}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
      >
        UX Enhancements ({totalEnhancementCount})
      </Button>

      <div
        className={styles.overlay}
        data-open={isOpen || undefined}
        onClick={handleClose}
      />
      <div
        ref={panelRef}
        className={styles.drawer}
        data-open={isOpen || undefined}
        role="dialog"
        aria-modal="true"
        aria-label="UX enhancement notes"
      >
        <div className={styles.drawerHeader}>
          <div>
            <div className={styles.drawerTitle}>UX Enhancements</div>
            <div className={styles.drawerSubtitle}>
              Beyond the static Figma spec
            </div>
          </div>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
            aria-label="Close drawer"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className={styles.drawerBody}>
          {children && <div className={styles.slot}>{children}</div>}

          {designNoteGroups.map((group) => (
            <div key={group.category} className={styles.group}>
              <div className={styles.groupTitle}>{group.category}</div>
              <ul className={styles.noteList}>
                {group.notes.map((note) => (
                  <li key={note} className={styles.noteItem}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
