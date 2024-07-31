import React, { useState } from 'react';
import styles from './Toolbar.module.scss';
import { ChromePicker } from 'react-color';
import { useStyle } from '../context/StyleContext';

const Toolbar: React.FC<{ onUndo: () => void; onRedo: () => void; }> = ({ onUndo, onRedo }) => {
  const { color, setColor } = useStyle(); 
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleColorChange = (color: any) => {
    setColor(color.hex); 
  };

  return (
    <div className={styles.toolbarContainer}>
      <button className={styles.toolbarButton} onClick={onUndo}>Undo</button>
      <button className={styles.toolbarButton} onClick={onRedo}>Redo</button>
      <div style={{ position: 'relative' }}>
        <div
          className={styles.colorPreview}
          style={{ '--color': color } as React.CSSProperties} 
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
        >
          {displayColorPicker && (
            <div className={styles.colorPickerContainer}>
              <ChromePicker
                color={color}
                onChangeComplete={handleColorChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
