import React from 'react';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC<{ onUndo: () => void; onRedo: () => void; }> = ({ onUndo, onRedo }) => {

  return (
    <div className={styles.toolbarContainer}>
      <button className={styles.toolbarButton} onClick={onUndo}>Undo</button>
      <button className={styles.toolbarButton} onClick={onRedo}>Redo</button>
      
    </div>
  );
};

export default Toolbar;
