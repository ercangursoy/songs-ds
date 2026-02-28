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
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const unmountTimer = useRef<ReturnType<typeof setTimeout>>();

  useFocusTrap(panelRef, visible);

  const handleOpen = useCallback(() => {
    clearTimeout(unmountTimer.current);
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    unmountTimer.current = setTimeout(() => setMounted(false), 200);
  }, []);

  useEffect(() => {
    if (!visible) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, handleClose]);

  useEffect(() => {
    return () => clearTimeout(unmountTimer.current);
  }, []);

  return (
    <>
      <Button
        variant="primary"
        className={styles.trigger}
        onClick={() => (mounted ? handleClose() : handleOpen())}
        aria-expanded={visible}
      >
        UX Enhancements ({totalEnhancementCount})
      </Button>

      {mounted && (
        <>
          <div
            className={styles.overlay}
            data-open={visible || undefined}
            onClick={handleClose}
          />
          <div
            ref={panelRef}
            className={styles.drawer}
            data-open={visible || undefined}
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
      )}
    </>
  );
}
