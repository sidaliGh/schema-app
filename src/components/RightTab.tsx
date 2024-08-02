import React, { useState, useEffect } from 'react'
import styles from './RightTab.module.scss'
import { useStyle } from '../context/StyleContext'
import { SketchPicker } from 'react-color'

interface RightTabProps {
  onAddText: (text: string) => void
}

const RightTab: React.FC<RightTabProps> = ({ onAddText }) => {
  const {
    selectedShape,
    updateHeightSelectedShape,
    updatedIsFlipedSelectedShape,
    updateMarginTopSelectedShape,
    updateMarginBottomSelectedShape,
    updateParckingSpotNumber,
    updateRoadSpeed,
    updateRoadSpeedUnit,
    updateFontSizeSelectedShape,
    updateFontWeightSelectedShape,
    updateTextColorSelectedShape,
  } = useStyle()
  const [text, setText] = useState('')
  const [height, setHeight] = useState('')
  const [parckingSpotNumber, setParckingSpotNumber] = useState('')
  const [marginTop, setMarginTop] = useState('')
  const [marginBottom, setMarginBottom] = useState('')
  const [speed, setSpeed] = useState('')
  const [speedUnit, setSpeedUnit] = useState('')
  const [isFliped, setIsFliped] = useState(false)
  const [fontSize, setFontSize] = useState('')
  const [fontWeight, setFontWeight] = useState('')
  const [textColor, setTextColor] = useState('')

  useEffect(() => {
    if (selectedShape) {
      if (selectedShape.shape.type === 'Text') {
        setFontSize(selectedShape.fontSize?.toString() || '')
        setFontWeight(selectedShape.fontWeight || '')
        setTextColor(selectedShape.textColor || '#000000')
      } else {
        setHeight(selectedShape.height?.toString() || '')
        setMarginTop(selectedShape.marginTop?.toString() || '')
        setMarginBottom(selectedShape.marginBottom?.toString() || '')
        setSpeed(selectedShape.shape.speed?.toString() || '')
        setParckingSpotNumber(selectedShape.shape.spotNumber?.toString() || '')
        setIsFliped(selectedShape.isFliped || false)
        setSpeedUnit(selectedShape.shape.speedUnit || '')
      }
    } else {
      setHeight('')
      setMarginTop('')
      setMarginBottom('')
      setSpeed('')
      setSpeedUnit('')
      setParckingSpotNumber('')
      setIsFliped(false)
      setFontSize('')
      setFontWeight('')
      setTextColor('')
    }
  }, [selectedShape])

  const handleTextKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && text.trim()) {
      onAddText(text)
      setText('')
    }
  }

  const handleHeightKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && selectedShape && height.trim()) {
      updateHeightSelectedShape(selectedShape.id, parseFloat(height))
    }
  }


  const handleParckingSpotNumberKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && selectedShape && parckingSpotNumber) {
      updateParckingSpotNumber(selectedShape.id, parseInt(parckingSpotNumber))
    }
  }
  const handleMarginTopKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && selectedShape && marginTop.trim()) {
      updateMarginTopSelectedShape(selectedShape.id, parseFloat(marginTop))
    }
  }
  const handleMarginBottomKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && selectedShape && marginBottom.trim()) {
      updateMarginBottomSelectedShape(
        selectedShape.id,
        parseFloat(marginBottom)
      )
    }
  }
  const handleSpeedKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && selectedShape && speed.trim()) {
      updateRoadSpeed(selectedShape.id, parseFloat(speed))
    }
  }
  const handleSpeedUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedShape) {
      const unit = event.target.value;
      setSpeedUnit(unit);
      updateRoadSpeedUnit(selectedShape.id, unit);
    }
  }
  const handleFlipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedShape) {
      const fliped = event.target.checked
      setIsFliped(fliped)
      updatedIsFlipedSelectedShape(selectedShape.id, fliped)
    }
  }

  const handleFontSizeKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && selectedShape && fontSize.trim()) {
      updateFontSizeSelectedShape(selectedShape.id, parseFloat(fontSize))
    }
  }

  const handleFontWeightKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && selectedShape && fontWeight.trim()) {
      updateFontWeightSelectedShape(selectedShape.id, fontWeight)
    }
  }

  const handleTextColorChange = (color: any) => {
    if (selectedShape) {
      setTextColor(color.hex)
      updateTextColorSelectedShape(selectedShape.id, color.hex)
    }
  }

  return (
    <div className={styles.rightTabContainer}>
      <div className={styles.topContainer}>
        <h3 className={styles.title}>Properties</h3>
        {!selectedShape && <p>No shape selected</p>}
        {selectedShape && selectedShape.shape.type !== 'Text' && (
          <div className={styles.inputContainer}>
            {selectedShape.shape.type === 'spotNumber' && (
              <>
                <div className={styles.inputContainer}>
                <label >Height</label>
                  <input
                    type='number'
                    className={styles.sizeInput}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    onKeyPress={handleHeightKeyPress}
                    
                  />
                </div>
                <div className={styles.inputContainer}>
                <label >Spot Number</label>
                  <input
                    type='number'
                    className={styles.sizeInput}
                    value={parckingSpotNumber}
                    onChange={(e) => setParckingSpotNumber(e.target.value)}
                    onKeyPress={handleParckingSpotNumberKeyPress}
                    
                  />
                </div>
              </>
            )}
            {selectedShape.shape.type === 'wasteBin' && (
              <>
                <div className={styles.inputContainer}>
                <label >Move Down</label>
                  <input
                    type='number'
                    className={styles.sizeInput}
                    value={marginTop}
                    onChange={(e) => setMarginTop(e.target.value)}
                    onKeyPress={handleMarginTopKeyPress}
                    
                  />
                </div>
                <div className={styles.inputContainer}>
                <label>Move Up</label>
                  <input
                    type='number'
                    className={styles.sizeInput}
                    value={marginBottom}
                    onChange={(e) => setMarginBottom(e.target.value)}
                    onKeyPress={handleMarginBottomKeyPress}
                    
                  />
                </div>
              </>
            )}
            {selectedShape.shape.type === 'road' && (
              <>
                <div className={styles.inputContainer}>
                <label >Speed Unit</label>
                <select
    className={styles.sizeInput}
    value={speedUnit}
    onChange={handleSpeedUnitChange}
>
    <option value="KMH">KMH</option>
    <option value="MPH">MPH</option>
</select>
                </div>
                <div className={styles.inputContainer}>
                <label >Speed</label>
                  <input
                    type='number'
                    className={styles.sizeInput}
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    onKeyPress={handleSpeedKeyPress}
                  
                  />
                </div>
              </>
            )}
        {(selectedShape.shape.type === 'parkingSpot' || selectedShape.shape.type === 'spotNumber') && (
  <>
    <input
      type='checkbox'
      id='isFliped'
      checked={isFliped}
      onChange={handleFlipChange}
    />
    <label htmlFor='isFliped'>Flip</label>
  </>
)}
          </div>
        )}
        {selectedShape && selectedShape.shape.type === 'Text' && (
          <div className={styles.inputContainer}>
            <input
              type='number'
              className={styles.sizeInput}
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              onKeyPress={handleFontSizeKeyPress}
              placeholder='Font Size'
            />
            <input
              type='text'
              className={styles.sizeInput}
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              onKeyPress={handleFontWeightKeyPress}
              placeholder='Font Weight'
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
          type='text'
          className={styles.textInput}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleTextKeyPress}
          placeholder='Enter text and press Enter'
        />
      </div>
      <div>
        <h3>Guide</h3>
        <p>Press <strong>X</strong> to move just on <strong>Y-Axis</strong> </p>
      </div>
    </div>
  )
}

export default RightTab
