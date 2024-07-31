import React from 'react';
import styles from './ShapeLibrary.module.scss';

interface ShapeLibraryProps {
  onDragStart: (event: React.DragEvent<HTMLDivElement>, shape: string) => void;
}

const ShapeLibrary: React.FC<ShapeLibraryProps> = ({ onDragStart }) => {
  const renderShape = (shape: string) => {
    switch (shape) {
      case 'Circle':
        return (
          <svg className={styles.shapeSvg} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="white" stroke="gray" strokeWidth="2"/>
          </svg>
        );
      case 'Rectangle':
        return (
          <svg className={styles.shapeSvg} viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" fill="white" stroke="gray" strokeWidth="2"/>
          </svg>
        );
      case 'Triangle':
        return (
          <svg className={styles.shapeSvg} viewBox="0 0 100 100">
            <polygon points="50,15 15,85 85,85" fill="white" stroke="gray" strokeWidth="2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.libraryContainer}>
      <h3 className={styles.title}>Elements</h3>
      {['Rectangle', 'Circle', 'Triangle'].map(shape => (
        <div
          key={shape}
          className={styles.shapeContainer}
          draggable
          onDragStart={(e) => onDragStart(e, shape)}
        >
          {renderShape(shape)}
        </div>
      ))}
    </div>
  );
};

export default ShapeLibrary;
