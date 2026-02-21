import { useState, useCallback, useEffect } from 'react';
import { CloseIcon } from '@/icons';
import { designNoteGroups, totalEnhancementCount } from '@/data/designNotes';
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
        UX Enhancements ({totalEnhancementCount})
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={handleClose}>
          <div
            className={styles.panel}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
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
              {designNoteGroups.map((group) => (
                <div key={group.category} className={styles.group}>
                  <div className={styles.groupTitle}>{group.category}</div>
                  <ul className={styles.noteList}>
                    {group.notes.map((note) => (
                      <li key={note} className={styles.noteItem}>{note}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
