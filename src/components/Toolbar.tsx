import React from 'react';
import styles from './Toolbar.module.scss';
import { useStyle } from '../context/StyleContext';

const Toolbar: React.FC<{ onUndo: () => void; onRedo: () => void; }> = ({ onUndo, onRedo }) => {
  const { shapes, postionAsPrevToTop, postionAsPrevToBottom, updatePositionAsPrevToTheTop, updatePositionAsPrevToTheBottom } = useStyle();
  return (
    <div className={styles.toolbarContainer}>
      <button className={styles.toolbarButton} onClick={onUndo}>Undo</button>
      {shapes.length > 0 && (
        <>
          <div>
            <input
              type="checkbox"
              disabled={postionAsPrevToBottom}
              checked={postionAsPrevToTop}
              onChange={(e) => updatePositionAsPrevToTheTop(e.target.checked)}
            />
            <label>Position as previous to top</label>
          </div>
          <div>
          <input
            type="checkbox"
            disabled={postionAsPrevToTop}
            checked={postionAsPrevToBottom}
            onChange={(e) => updatePositionAsPrevToTheBottom(e.target.checked)}
          />
          <label>Position as previous to Bottom</label>
                </div>
        </>
      )}
      <button className={styles.toolbarButton} onClick={onRedo}>Redo</button>
      
    </div>
  );
};

export default Toolbar;
