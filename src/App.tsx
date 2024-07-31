import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ShapeLibrary from './components/ShapeLibrary';
import DrawingArea from './components/DrawingArea';
import Toolbar from './components/Toolbar';
import RightTab from './components/RightTab';
import { useStyle } from './context/StyleContext';
import styles from './App.module.scss';

interface Shape {
  id: string;
  shape: string;
  x: number;
  y: number;
  text?: string;
}

const App: React.FC = () => {
  const { shapes, setShapes } = useStyle();
  const [undoStack, setUndoStack] = useState<Shape[][]>([]);
  const [redoStack, setRedoStack] = useState<Shape[][]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const pushUndo = (shapes: Shape[]) => {
    setUndoStack(prev => [...prev, shapes]);
    setRedoStack([]); 
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, shape: string) => {
    event.dataTransfer.setData('shape', shape);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const shape = event.dataTransfer.getData('shape');
    if (!canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;

    pushUndo(shapes); 
    const newShape: Shape = { id: uuidv4(), shape, x, y };
    setShapes([...shapes, newShape]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const prevShapes = undoStack.pop()!;
    setRedoStack(prev => [...prev, shapes]);
    setShapes(prevShapes);
    setUndoStack(undoStack);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const nextShapes = redoStack.pop()!;
    setUndoStack(prev => [...prev, shapes]);
    setShapes(nextShapes);
    setRedoStack(redoStack);
  };

  const handleAddText = (text: string) => {
    if (!canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = canvasRect.width / 2;
    const y = canvasRect.height / 2;

    pushUndo(shapes); 
    const newShape: Shape = { id: uuidv4(), shape: 'Text', x, y, text };
    setShapes([...shapes, newShape]);
  };

  return (
    <div className={styles.appContainer}>
      <ShapeLibrary onDragStart={handleDragStart} />
      <div className={styles.mainContent}>
        <Toolbar onUndo={handleUndo} onRedo={handleRedo} />
        <div className={styles.workspace}>
          <DrawingArea ref={canvasRef} shapes={shapes} onDrop={handleDrop} onShapesChange={setShapes} />
          <RightTab onAddText={handleAddText} />
        </div>
      </div>
    </div>
  );
};

export default App;
