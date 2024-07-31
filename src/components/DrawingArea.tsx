import React, { useEffect, forwardRef } from 'react';
import * as d3 from 'd3';
import ContextMenu from './ContextMenu';
import { useStyle } from '../context/StyleContext';
import styles from './DrawingArea.module.scss';

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

interface DrawingAreaProps {
  shapes: Shape[];
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onShapesChange: (shapes: Shape[]) => void;
}

const DrawingArea = forwardRef<HTMLDivElement, DrawingAreaProps>(({ shapes, onDrop, onShapesChange }, ref) => {
  const canvasRef = ref as React.RefObject<HTMLDivElement>;
  const { color, selectedShape, setSelectedShape } = useStyle();
  const [contextMenu, setContextMenu] = React.useState<{ x: number; y: number } | null>(null);
  const [resizing, setResizing] = React.useState<boolean>(false);
  const [rotating, setRotating] = React.useState<boolean>(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const svg = d3.select(canvasRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    svg.call(d3.zoom<SVGSVGElement, unknown>().on('zoom', (event) => {
      svg.attr('transform', event.transform);
    }));

    return () => {
      svg.remove();
    };
  }, [canvasRef]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const svg = d3.select(canvasRef.current).select('svg');
    svg.selectAll('*').remove();

    const circleDrag = d3.drag<SVGCircleElement, Shape>()
      .on('start', (event, d) => {
        if (resizing || rotating) return;
        d3.select(event.sourceEvent.target).raise();
        setSelectedShape(d);
      })
      .on('drag', (event, d) => {
        if (resizing || rotating) return;
        const newShapes = shapes.map(shape => {
          if (shape.id === d.id) {
            return {
              ...shape,
              x: event.x,
              y: event.y,
            };
          }
          return shape;
        });
        onShapesChange(newShapes);
      });

    const rectDrag = d3.drag<SVGRectElement, Shape>()
      .on('start', (event, d) => {
        if (resizing || rotating) return;
        d3.select(event.sourceEvent.target).raise();
        setSelectedShape(d);
      })
      .on('drag', (event, d) => {
        if (resizing || rotating) return;
        const newShapes = shapes.map(shape => {
          if (shape.id === d.id) {
            return {
              ...shape,
              x: event.x,
              y: event.y,
            };
          }
          return shape;
        });
        onShapesChange(newShapes);
      });

    const polygonDrag = d3.drag<SVGPolygonElement, Shape>()
      .on('start', (event, d) => {
        if (resizing || rotating) return;
        d3.select(event.sourceEvent.target).raise();
        setSelectedShape(d);
      })
      .on('drag', (event, d) => {
        if (resizing || rotating) return;
        const newShapes = shapes.map(shape => {
          if (shape.id === d.id) {
            return {
              ...shape,
              x: event.x,
              y: event.y,
            };
          }
          return shape;
        });
        onShapesChange(newShapes);
      });

    const resizeDrag = d3.drag<SVGRectElement, Shape>()
      .on('start', (event, d) => {
        setSelectedShape(d);
        setResizing(true);
      })
      .on('drag', (event, d) => {
        if (!resizing) return;
        const aspectRatio = (d.width || 50) / (d.height || 50);
        const shiftKey = event.sourceEvent.shiftKey;
        let newWidth: number;
        let newHeight: number;

        if (shiftKey) {
          const distance = Math.sqrt(Math.pow(event.x - d.x, 2) + Math.pow(event.y - d.y, 2));
          newWidth = distance * aspectRatio;
          newHeight = distance / aspectRatio;
        } else {
          newWidth = Math.max(10, event.x - d.x + (d.width || 50));
          newHeight = Math.max(10, event.y - d.y + (d.height || 50));
        }

        const newShapes = shapes.map(shape => {
          if (shape.id === d.id) {
            return {
              ...shape,
              width: newWidth,
              height: newHeight,
              x: event.x - newWidth / 2,
              y: event.y - newHeight / 2,
            };
          }
          return shape;
        });
        onShapesChange(newShapes);
      })
      .on('end', () => {
        setResizing(false);
      });

    const rotateDrag = d3.drag<SVGRectElement, Shape>()
      .on('start', (event, d) => {
        setSelectedShape(d);
        setRotating(true);
      })
      .on('drag', (event, d) => {
        if (!rotating || !selectedShape) return;

        const centerX = d.x + (d.width || 50) / 2;
        const centerY = d.y + (d.height || 50) / 2;
        const angle = Math.atan2(event.y - centerY, event.x - centerX);
        let rotation = angle * (180 / Math.PI);

        if (event.sourceEvent.shiftKey) {
          rotation = Math.round(rotation / 45) * 45;
        }

        const newShapes = shapes.map(shape => {
          if (shape.id === selectedShape.id) {
            return {
              ...shape,
              rotation: rotation
            };
          }
          return shape;
        });
        onShapesChange(newShapes);
      })
      .on('end', () => {
        setRotating(false);
      });

    svg.selectAll('circle')
      .data(shapes.filter(shape => shape.shape === 'Circle'))
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => (d.width || 50) / 2)
      .attr('fill', d => d.color || color)
      .attr('transform', d => d.rotation ? `rotate(${d.rotation}, ${d.x}, ${d.y})` : '')
      .call(circleDrag)
      .on('contextmenu', (event, d) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
        setSelectedShape(d);
      });

    svg.selectAll('rect')
      .data(shapes.filter(shape => shape.shape === 'Rectangle'))
      .enter()
      .append('rect')
      .attr('x', d => d.x - (d.width || 50) / 2)
      .attr('y', d => d.y - (d.height || 50) / 2)
      .attr('width', d => d.width || 50)
      .attr('height', d => d.height || 50)
      .attr('fill', d => d.color || color)
      .attr('rx', d => d.borderRadius || 0) 
      .attr('ry', d => d.borderRadius || 0) 
      .attr('transform', d => d.rotation ? `rotate(${d.rotation}, ${d.x}, ${d.y})` : '')
      .call(rectDrag)
      .on('contextmenu', (event, d) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
        setSelectedShape(d);
      });

    svg.selectAll('polygon')
      .data(shapes.filter(shape => shape.shape === 'Triangle'))
      .enter()
      .append('polygon')
      .attr('points', d => {
        const size = d.width || 50;
        const halfSize = size / 2;
        return [
          `${d.x},${d.y - halfSize}`,
          `${d.x - halfSize},${d.y + halfSize}`,
          `${d.x + halfSize},${d.y + halfSize}`
        ].join(' ');
      })
      .attr('fill', d => d.color || color)
      .attr('transform', d => d.rotation ? `rotate(${d.rotation}, ${d.x}, ${d.y})` : '')
      .call(polygonDrag)
      .on('contextmenu', (event, d) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
        setSelectedShape(d);
      });

    const textDrag = d3.drag<SVGTextElement, Shape>()
      .on('start', (event, d) => {
        setSelectedShape(d);
        d3.select(event.sourceEvent.target).raise();
      })
      .on('drag', (event, d) => {
        const newShapes = shapes.map(shape => {
          if (shape === d) {
            return {
              ...shape,
              x: event.x,
              y: event.y,
            };
          }
          return shape;
        });
        onShapesChange(newShapes);
      });

    svg.selectAll('text')
      .data(shapes.filter(shape => shape.shape === 'Text'))
      .enter()
      .append('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('fill', d => d.textColor || 'black')
      .attr('font-size', d => d.fontSize || 16)
      .attr('font-weight', d => d.fontWeight || 'normal')
      .text(d => d.text || '')
      .style('cursor', 'grab')  
      .call(textDrag)
      .on('contextmenu', (event, d) => {
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
        setSelectedShape(d);
      });

    if (resizing && selectedShape) {
      svg.selectAll('rect.resizer')
        .data([selectedShape])
        .enter()
        .append('rect')
        .attr('class', styles.resizer)
        .attr('x', d => d.x + (d.width || 50) / 2 - 5)
        .attr('y', d => d.y + (d.height || 50) / 2 - 5)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', 'black')
        .call(resizeDrag);
    }

    if (rotating && selectedShape) {
      svg.selectAll('rect.rotator')
        .data([selectedShape])
        .enter()
        .append('rect')
        .attr('class', styles.rotator)
        .attr('x', d => d.x + (d.width || 50) / 2 - 5)
        .attr('y', d => d.y - 30)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', 'black')
        .call(rotateDrag);
    }

  }, [shapes, canvasRef, selectedShape, resizing, rotating, onShapesChange]);

  const handleResize = () => {
    setResizing(true);
  };

  const handleRotate = () => {
    setRotating(true);
  };

  const handleChangeColor = (color: string) => {
    if (selectedShape) {
      const newShapes = shapes.map(shape => {
        if (shape.id === selectedShape.id) {
          return {
            ...shape,
            color
          };
        }
        return shape;
      });
      onShapesChange(newShapes);
    }
  };

  return (
    <div
      className={styles.canvas}
      ref={canvasRef}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onMouseUp={() => {
        setResizing(false);
        setRotating(false);
      }}
    >
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onResize={handleResize}
          onChangeColor={handleChangeColor}
          onRotate={handleRotate}
          onClose={() => setContextMenu(null)}
          color={selectedShape?.color || color}
        />
      )}
    </div>
  );
});

export default DrawingArea;
