import { useState, useCallback, useEffect } from 'react';
import { CloseIcon } from '@/icons';
import { designNotes } from '@/data/designNotes';
import styles from './DesignNotes.module.css';

export function DesignNotes() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  return (
    <>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        UX Enhancements ({designNotes.length})
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={handleClose}>
          <div
            className={styles.panel}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="UX enhancement notes"
          >
            <div className={styles.panelHeader}>
              <div>
                <div className={styles.panelTitle}>Opinionated UX Enhancements</div>
                <div className={styles.panelSubtitle}>
                  Interaction styles added beyond the static Figma spec
                </div>
              </div>
              <button
                className={styles.closeButton}
                onClick={handleClose}
                type="button"
                aria-label="Close"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className={styles.panelBody}>
              {designNotes.map((note, i) => (
                <div key={i} className={styles.noteRow}>
                  <div className={styles.noteComponent}>{note.component}</div>
                  <div className={styles.noteContent}>
                    <div className={styles.noteProperty}>{note.property}</div>
                    <div className={styles.noteRationale}>{note.rationale}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
