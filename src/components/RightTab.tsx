import React, { useState, useEffect } from 'react';
import styles from './RightTab.module.scss';
import { useStyle } from '../context/StyleContext';
import { SketchPicker } from 'react-color';

interface RightTabProps {
  onAddText: (text: string) => void;
}

const RightTab: React.FC<RightTabProps> = ({ onAddText }) => {
  const { selectedShape, updateHeightSelectedShape, updateWidthSelectedShape, updateBorderRadiusSelectedShape, updateFontSizeSelectedShape, updateFontWeightSelectedShape, updateTextColorSelectedShape } = useStyle();
  const [text, setText] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [borderRadius, setBorderRadius] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [fontWeight, setFontWeight] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    if (selectedShape) {
      if (selectedShape.shape === 'Text') {
        setFontSize(selectedShape.fontSize?.toString() || '');
        setFontWeight(selectedShape.fontWeight || '');
        setTextColor(selectedShape.textColor || '#000000');
      } else {
        setHeight(selectedShape.height?.toString() || '');
        setWidth(selectedShape.width?.toString() || '');
        setBorderRadius(selectedShape.borderRadius?.toString() || '');
      }
    } else {
      setHeight('');
      setWidth('');
      setBorderRadius('');
      setFontSize('');
      setFontWeight('');
      setTextColor('');
    }
  }, [selectedShape]);

  const handleTextKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && text.trim()) {
      onAddText(text);
      setText('');
    }
  };

  const handleHeightKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selectedShape && height.trim()) {
      updateHeightSelectedShape(selectedShape.id, parseFloat(height));
    }
  };

  const handleWidthKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selectedShape && width.trim()) {
      updateWidthSelectedShape(selectedShape.id, parseFloat(width));
    }
  };

  const handleBorderRadiusKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selectedShape && borderRadius.trim()) {
      updateBorderRadiusSelectedShape(selectedShape.id, parseFloat(borderRadius));
    }
  };

  const handleFontSizeKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selectedShape && fontSize.trim()) {
      updateFontSizeSelectedShape(selectedShape.id, parseFloat(fontSize));
    }
  };

  const handleFontWeightKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && selectedShape && fontWeight.trim()) {
      updateFontWeightSelectedShape(selectedShape.id, fontWeight);
    }
  };

  const handleTextColorChange = (color: any) => {
    if (selectedShape) {
      setTextColor(color.hex);
      updateTextColorSelectedShape(selectedShape.id, color.hex);
    }
  };

  return (
    <div className={styles.rightTabContainer}>
      <div className={styles.topContainer}>
        <h3 className={styles.title}>Properties</h3>
        {!selectedShape && <p>No shape selected</p>}
        {selectedShape && selectedShape.shape !== 'Text' && (
          <div className={styles.inputContainer}>
            <input
              type="number"
              className={styles.sizeInput}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onKeyPress={handleHeightKeyPress}
              placeholder="Height"
            />
            <input
              type="number"
              className={styles.sizeInput}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              onKeyPress={handleWidthKeyPress}
              placeholder="Width"
            />
            <input
              type="number"
              className={styles.sizeInput}
              value={borderRadius}
              onChange={(e) => setBorderRadius(e.target.value)}
              onKeyPress={handleBorderRadiusKeyPress}
              placeholder="Border Radius"
            />
          </div>
        )}
        {selectedShape && selectedShape.shape === 'Text' && (
          <div className={styles.inputContainer}>
            <input
              type="number"
              className={styles.sizeInput}
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              onKeyPress={handleFontSizeKeyPress}
              placeholder="Font Size"
            />
            <input
              type="text"
              className={styles.sizeInput}
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              onKeyPress={handleFontWeightKeyPress}
              placeholder="Font Weight"
            />
            <SketchPicker
              color={textColor}
              onChangeComplete={handleTextColorChange}
            />
          </div>
        )}
      </div>
      <div className={styles.bottomContainer}>
        <h3 className={styles.title}>Add Text</h3>
        <input
          type="text"
          className={styles.textInput}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleTextKeyPress}
          placeholder="Enter text and press Enter"
        />
      </div>
    </div>
  );
};

export default RightTab;
