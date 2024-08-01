import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Shape } from '../types/types';
import { v4 as uuidv4 } from 'uuid'



interface StyleContextType {
  undoStack: Shape[][];
  redoStack: Shape[][];
  color: string;
  setColor: (color: string) => void;
  selectedShape: Shape | null;
  setSelectedShape: (shape: Shape | null) => void;
  shapes: Shape[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
  updatedIsFlipedSelectedShape: (id: string, isFliped: boolean) => void;
  updateMarginTopSelectedShape:(id: string, marginTop: number) => void;
  updateMarginBottomSelectedShape:(id: string, marginBottom: number) => void;
  updateRoadSpeed:(id: string, speed: number) => void;
  updateRoadSpeedUnit:(id: string, speedUnit: string) => void;
  updateHeightSelectedShape: (id: string, height: number) => void;
  updateParckingSpotNumber: (id: string, spotNumber: number) => void;
  updateFontSizeSelectedShape: (id: string, fontSize: number) => void;
  updateFontWeightSelectedShape: (id: string, fontWeight: string) => void;
  updateTextColorSelectedShape: (id: string, textColor: string) => void;
  onDuplicate: (shape: Shape) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  pushUndo: (shapes: Shape[]) => void;
  handleRemoveShape: () => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const useStyle = (): StyleContextType => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};

export const StyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [color, setColor] = useState<string>('#9013FE');
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [undoStack, setUndoStack] = useState<Shape[][]>([]);
  const [redoStack, setRedoStack] = useState<Shape[][]>([]);


  useEffect(() => {
    if (selectedShape && !shapes.some(shape => shape.id === selectedShape.id)) {
      setSelectedShape(null);
    }
  }, [selectedShape, shapes]);

  const updateHeightSelectedShape = (id: string, height: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, height } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, height } : null);
    }
  };


  const updateMarginTopSelectedShape = (id: string, marginTop: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, marginTop } : shape
      )
    );
  }

  const updateMarginBottomSelectedShape = (id: string, marginBottom: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, marginBottom } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, marginBottom } : null);
    }
  };
  const updateRoadSpeed = (id: string, speed: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, shape: { ...shape.shape, speed } } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, shape: { ...prev.shape, speed } } : null);
    }
  };
  const updateRoadSpeedUnit = (id: string, speedUnit: string) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, shape: { ...shape.shape, speedUnit } } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, shape: { ...prev.shape, speedUnit } } : null);
    }
  };
  const updateParckingSpotNumber = (id: string, spotNumber: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, shape: { ...shape.shape, spotNumber } } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, shape: { ...prev.shape, spotNumber } } : null);
    }
  };
  const updatedIsFlipedSelectedShape = (id: string, isFliped: boolean) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, isFliped } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, isFliped } : null);
    }
  };


  const updateFontSizeSelectedShape = (id: string, fontSize: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, fontSize } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, fontSize } : null);
    }
  };

  const updateFontWeightSelectedShape = (id: string, fontWeight: string) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, fontWeight } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, fontWeight } : null);
    }
  };

  const updateTextColorSelectedShape = (id: string, textColor: string) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, textColor } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, textColor } : null);
    }
  };
  const onDuplicate = (shape: Shape) => {
   
    const newShape: Shape = { ...shape, id: uuidv4(), y: shape.y + 80, x: shape.x + 50 }; // Create a new shape with a unique ID and updated x and y coordinates
    setShapes(prevShapes => [...prevShapes, newShape]);
  };

  const pushUndo = (shapes: Shape[]) => {
    setUndoStack((prev) => [...prev, shapes]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const prevShapes = undoStack.pop()!;
    setRedoStack((prev) => [...prev, shapes]);
    setShapes(prevShapes);
    setUndoStack(undoStack);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const nextShapes = redoStack.pop()!;
    setUndoStack((prev) => [...prev, shapes]);
    setShapes(nextShapes);
    setRedoStack(redoStack);
  };
  
  const handleRemoveShape = () => {
    if (!selectedShape) return;
  
    const newShapes = shapes.filter((shape) => shape.id !== selectedShape.id);
    pushUndo(shapes);
    setShapes(newShapes);
    setSelectedShape(null);
  };

  return (
    <StyleContext.Provider
      value={{
        color,
        setColor,
        selectedShape,
        setSelectedShape,
        shapes,
        undoStack,
        redoStack,
        setShapes,
        updateHeightSelectedShape,
        updateFontSizeSelectedShape,
        updateFontWeightSelectedShape,
        updateTextColorSelectedShape,
        updateMarginTopSelectedShape,
        updateMarginBottomSelectedShape,
        updatedIsFlipedSelectedShape,
        updateRoadSpeed,
        updateRoadSpeedUnit,
        updateParckingSpotNumber,
        onDuplicate,
        handleUndo,
        handleRedo,
        pushUndo,
        handleRemoveShape
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
