import React, { useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import styles from './ContextMenu.module.scss';

interface ContextMenuProps {
  x: number;
  y: number;
  color: string;
  onResize: () => void;
  onChangeColor: (color: string) => void;
  onRotate: () => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, color, onResize, onChangeColor, onRotate, onClose }) => {
  const [showColorPicker, setShowColorPicker] = React.useState<boolean>(false);
  const [localColor, setLocalColor] = React.useState<string>(color);

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

  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  return (
    <div 
      className={styles.menu} 
      ref={menuRef} 
      style={{ left: x, top: y }}
    >
      <div 
        className={styles.menuItem} 
        onClick={() => { onResize(); onClose(); }}
      >
        Resize
      </div>
      <div 
        className={styles.menuItem} 
        onClick={() => { setShowColorPicker(!showColorPicker); }}
      >
        Change Color
      </div>
      {showColorPicker && (
        <div style={{ marginTop: '10px' }}>
          <SketchPicker
            color={localColor}
            onChangeComplete={(color) => {
              setLocalColor(color.hex);
              onChangeColor(color.hex); 
            }}
          />
        </div>
      )}
      <div 
        className={styles.menuItem} 
        onClick={() => { onRotate(); onClose(); }}
      >
        Rotate
      </div>
    </div>
  );
};

export default ContextMenu;
