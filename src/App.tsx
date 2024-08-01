import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ShapeLibrary from './components/ShapeLibrary'
import DrawingArea from './components/DrawingArea'
import Toolbar from './components/Toolbar'
import RightTab from './components/RightTab'
import { useStyle } from './context/StyleContext'
import styles from './App.module.scss'
import { Shape, ShapeProperties } from './types/types'



const App: React.FC = () => {
  const { shapes, setShapes, handleUndo, handleRedo, pushUndo } = useStyle()
  const canvasRef = useRef<HTMLDivElement>(null)



  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    shape: ShapeProperties
  ) => {
    const shapeString = JSON.stringify(shape)
    event.dataTransfer.setData('shape', shapeString)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    
    const shapeString = event.dataTransfer.getData('shape')
    const shape = JSON.parse(shapeString) as ShapeProperties
 

    if (!canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - canvasRect.left
    const y = event.clientY - canvasRect.top

    pushUndo(shapes)
    const newShape: Shape = { id: uuidv4(), shape: shape, x, y }
    setShapes([...shapes, newShape])
  }

  



  const handleAddText = (text: string) => {
    if (!canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const x = canvasRect.width / 2
    const y = canvasRect.height / 2

    pushUndo(shapes)
    const newShape: Shape = {
      id: uuidv4(),  x, y, text,
      shape: {
        name: '',
        type: 'Text',
        color: '',
        icon: ''
      }
    }
    setShapes([...shapes, newShape])
  }

  return (
    <div className={styles.appContainer}>
      <ShapeLibrary onDragStart={handleDragStart} />
      <div className={styles.mainContent}>
        <Toolbar onUndo={handleUndo} onRedo={handleRedo} />
        <div className={styles.workspace}>
          <DrawingArea
            ref={canvasRef}
            shapes={shapes}
            onDrop={handleDrop}
            onShapesChange={setShapes}
          />
          <RightTab onAddText={handleAddText} />
        </div>
      </div>
    </div>
  )
}

export default App
