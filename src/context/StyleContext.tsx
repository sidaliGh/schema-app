import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Shape {
  id: string;
  shape: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  color?: string;
  text?: string;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: string;
  textColor?: string;
}

interface StyleContextType {
  color: string;
  setColor: (color: string) => void;
  selectedShape: Shape | null;
  setSelectedShape: (shape: Shape | null) => void;
  shapes: Shape[];
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>;
  updateHeightSelectedShape: (id: string, height: number) => void;
  updateWidthSelectedShape: (id: string, width: number) => void;
  updateBorderRadiusSelectedShape: (id: string, borderRadius: number) => void;
  updateFontSizeSelectedShape: (id: string, fontSize: number) => void;
  updateFontWeightSelectedShape: (id: string, fontWeight: string) => void;
  updateTextColorSelectedShape: (id: string, textColor: string) => void;
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

  const updateWidthSelectedShape = (id: string, width: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, width } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, width } : null);
    }
  };

  const updateBorderRadiusSelectedShape = (id: string, borderRadius: number) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, borderRadius } : shape
      )
    );
    if (selectedShape?.id === id) {
      setSelectedShape(prev => prev ? { ...prev, borderRadius } : null);
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

  return (
    <StyleContext.Provider
      value={{
        color,
        setColor,
        selectedShape,
        setSelectedShape,
        shapes,
        setShapes,
        updateHeightSelectedShape,
        updateWidthSelectedShape,
        updateBorderRadiusSelectedShape,
        updateFontSizeSelectedShape,
        updateFontWeightSelectedShape,
        updateTextColorSelectedShape
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
