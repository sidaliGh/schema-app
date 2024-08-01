import React, { useEffect, useRef } from 'react';
import styles from './ContextMenu.module.scss';
import { Shape } from '../types/types';
import { useStyle } from '../context/StyleContext';

interface ContextMenuProps {
  x: number;
  y: number;
  onDuplicate: (shape: Shape) => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onDuplicate, onClose }) => {
  const {  selectedShape,handleRemoveShape } = useStyle()

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);



  return (
    <div className={styles.menu} ref={menuRef} style={{ left: x - 120, top: y - 60 }}>
   
      <div
        className={styles.menuItem}
        onClick={() => {
          onDuplicate(selectedShape as Shape);
          onClose();
        }}
      >
        Duplicate
      </div>
      <div
        className={styles.menuItem}
        onClick={() => {
          handleRemoveShape()
          onClose();
        }}
      >
        Remove
      </div>
 
    </div>
  );
};

export default ContextMenu;