import React, { useEffect, forwardRef } from 'react'
import ReactDOMServer from 'react-dom/server'
import * as d3 from 'd3'
import ContextMenu from './ContextMenu'
import { useStyle } from '../context/StyleContext'
import styles from './DrawingArea.module.scss'
import WasteIcon from '../assets/icons/WasteIcon'
import NotAssingIcon from '../assets/icons/NotAssingIcon'
import HandicapIcon from '../assets/icons/HandicapIcon'
import ParckingSpotIcon from '../assets/icons/ParckingSpotIcon'
import ArrowUpIcon from '../assets/icons/ArrowUpIcon'
import ArrowUpRightIcon from '../assets/icons/ArrowUpRightIcon'
import { Shape } from '../types/types'


interface DrawingAreaProps {
  shapes: Shape[]
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void
  onShapesChange: (shapes: Shape[]) => void
}

const DrawingArea = forwardRef<HTMLDivElement, DrawingAreaProps>(
  ({ shapes, onDrop, onShapesChange }, ref) => {
    const canvasRef = ref as React.RefObject<HTMLDivElement>
    const { selectedShape, setSelectedShape,onDuplicate } = useStyle()
    const [contextMenu, setContextMenu] = React.useState<{
      x: number
      y: number
    } | null>(null)

    useEffect(() => {
      if (!canvasRef.current) return

      const svg = d3
        .select(canvasRef.current)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')

      return () => {
        svg.remove()
      }
    }, [canvasRef])
  

    useEffect(() => {
      if (!canvasRef.current) return

      const svg = d3.select(canvasRef.current).select('svg')
      svg.selectAll('*').remove()

      const rectDrag = d3
        .drag<SVGRectElement, Shape>()
        .on('start', (event, d) => {
          d3.select(event.sourceEvent.target).raise()
          setSelectedShape(d)
        })
        .on('drag', (event, d) => {
          const newShapes = shapes.map((shape) => {
            if (shape.id === d.id) {
              return {
                ...shape,
                x: event.x,
                y: event.y,
              }
            }
            return shape
          })
          onShapesChange(newShapes)
        })

      svg
        .selectAll('rect.parkingSpot')
        .data(shapes.filter((shape) => shape.shape.type === 'parkingSpot'))
        .enter()
        .append('rect')
        .attr('class', 'parkingSpot')
        .attr('x', (d) => d.x - 50 / 2)
        .attr(
          'y',
          (d) => d.y - 30 / 2 + (d.marginTop || 0) - (d.marginBottom || 0)
        )
        .attr('width', 50)
        .attr('height', 30)
        .attr('fill', (d) => d.shape.color || '#ccc')
        .attr('rx', 8)
        .attr('ry', 8)
        .attr(
          'transform',
          (d) => `rotate( ${d.isFliped ? -30 : 30}, ${d.x}, ${d.y})`
        )
        .call(rectDrag)
        .on('contextmenu', (event, d) => {
          event.preventDefault()
          setSelectedShape(d)
        })

      svg
        .selectAll('foreignObject.parkingSpot')
        .data(shapes.filter((shape) => shape.shape.type === 'parkingSpot'))
        .enter()
        .append('foreignObject')
        .attr('class', 'parkingSpot')
        .attr('x', (d) => d.x - 50 / 2 + 4)
        .attr('y', (d) => d.y - 30 / 1.5)
        .attr('width', 50 - 8)
        .attr('height', 50 - 8)
        .append('xhtml:div')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'center')
        .style('height', '100%')
        .style('width', '100%')
        .style('gap', '10px')
        .html(
          (d) => `
      <div class="${
        styles.parkingSpotIconContainer
      }" style="text-align: center;transform: rotate(${
            d.shape.parkingType === 'handicap'
              ? d.isFliped
                ? '50deg'
                : '-50deg'
              : d.isFliped
              ? '58deg'
              : '-58deg'
          })">
        ${d.shape.icon ? renderIcon(d.shape.icon) : ''}
      </div>
    `
        )

      svg
        .selectAll('rect.overlay.parkingSpot')
        .data(shapes.filter((shape) => shape.shape.type === 'parkingSpot'))
        .enter()
        .append('rect')
        .attr('class', 'overlay parkingSpot')
        .attr('x', (d) => d.x - 50 / 2 + 4)
        .attr('y', (d) => d.y - 30 / 2 + 4)
        .attr('width', 50 - 8)
        .attr('height', 30 - 8)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .call(rectDrag)
        .on('contextmenu', (event, d) => {
          event.preventDefault()
          setContextMenu({ x: event.clientX, y: event.clientY });
          setSelectedShape(d)
        })

      svg
        .selectAll('rect.wasteBin')
        .data(shapes.filter((shape) => shape.shape.type === 'wasteBin'))
        .enter()
        .append('rect')
        .attr('x', (d) => d.x - 130 / 2)
        .attr(
          'y',
          (d) =>
            d.y -
            (d.height || 50) / 2 +
            (d.marginTop || 0) -
            (d.marginBottom || 0)
        )
        .attr('width', 130)
        .attr('height', (d) => d.height || 50)
        .attr('fill', (d) => d.shape.color || '#ccc')
        .attr('rx', 8)
        .attr('ry', 8)
        .attr('transform', (d) =>
          d.rotation ? `rotate(${d.rotation}, ${d.x}, ${d.y})` : ''
        )
        .call(rectDrag)
        .on('contextmenu', (event, d) => {
          event.preventDefault()
          setContextMenu({ x: event.clientX, y: event.clientY });
         
          setSelectedShape(d)
        })

      svg
        .selectAll('foreignObject.wasteBin')
        .data(shapes.filter((shape) => shape.shape.type === 'wasteBin'))
        .enter()
        .append('foreignObject')
        .attr('x', (d) => d.x - 130 / 2 + 4)
        .attr(
          'y',
          (d) =>
            d.y -
            (d.height || 50) / 2 +
            4 +
            (d.marginTop || 0) -
            (d.marginBottom || 0)
        )
        .attr('width', 130 - 8)
        .attr('height', 50 - 8)
        .append('xhtml:div')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', (d) =>
          d.shape.wasteBinCategorie === 'notAssigned'
            ? 'center'
            : 'pace-between'
        )
        .style('height', '100%')
        .style('width', '100%')
        .style('gap', '10px')
        .html(
          (d) => `
      <div class="${styles.left}" style="flex: ${
            d.shape.wasteBinCategorie === 'notAssigned' ? 1 : 'none'
          }; text-align: ${
            d.shape.wasteBinCategorie === 'notAssigned' ? 'center' : 'left'
          }">
        ${d.shape.icon ? renderIcon(d.shape.icon) : ''}
      </div>
      ${
        d.shape.wasteBinCategorie !== 'notAssigned'
          ? `
          <div class="${styles.right}">
            <p style="margin: 0; color: white; font-size: 14px; font-weight: 600;">
              ${d.shape.name}
            </p>
          </div>
        `
          : ''
      }
    `
        )

      svg
        .selectAll('div.spotNumber')
        .data(shapes.filter((shape) => shape.shape.type === 'spotNumber'))
        .enter()
        .append('foreignObject')
        .attr('x', (d) => d.x || 0)
        .attr('y', (d) => d.y || 0)
        .attr('width', 30)
        .attr('height', (d) => (d.height ? d.height + 5 : 40 + 5))
        .append('xhtml:div')
        .style('height', (d) => (d.height ? d.height + 'px' : '40px'))
        .style('width', 30)
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .style('flex-direction', 'column')
        .style('border-right', '2px solid black')
        .style('border-top', '2px solid black')
        .style('border-bottom', '2px solid black')
        .style('transform', (d) => d.isFliped ? 'rotateY(180deg)' : 'rotateY(0deg)')
        .html((d) => `<span style="transform: ${d.isFliped ? 'rotateY(180deg)' : 'rotateY(0deg)'};">${d.shape.spotNumber}</span>`)

      svg
        .selectAll('rect.overlay.spotNumber')
        .data(shapes.filter((shape) => shape.shape.type === 'spotNumber'))
        .enter()
        .append('rect')
        .attr('class', 'overlay')
        .attr('x', (d) => d.x || 0)
        .attr('y', (d) => d.y || 0)
        .attr('width', 30)
        .attr('height', (d) => d.height || 40)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .call(rectDrag)
        .on('contextmenu', (event, d) => {
          event.preventDefault()
          setContextMenu({ x: event.clientX, y: event.clientY });
          setSelectedShape(d)
        })

      svg
        .selectAll('rect.overlay.wasteBin')
        .data(shapes.filter((shape) => shape.shape.type === 'wasteBin'))
        .enter()
        .append('rect')
        .attr('class', 'overlay')
        .attr('x', (d) => d.x - 130 / 2 + 4)
        .attr(
          'y',
          (d) =>
            d.y -
            (d.height || 50) / 2 +
            4 +
            (d.marginTop || 0) -
            (d.marginBottom || 0)
        )
        .attr('width', 130 - 8)
        .attr('height', (d) => d.height || 50 - 8)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .call(rectDrag)
        .on('contextmenu', (event, d) => {
          event.preventDefault()
          setContextMenu({ x: event.clientX, y: event.clientY });
          setSelectedShape(d)
        })

      svg
        .selectAll('rect.road')
        .data(shapes.filter((shape) => shape.shape.type === 'road'))
        .enter()
        .append('rect')
        .attr('class', 'road')
        .attr('x', (d) => d.x - 65 / 2)
        .attr('y', (d) => d.y - (d.height || 700) / 2)
        .attr('width', 65)
        .attr('height', (d) => d.height || 700)
        .attr('fill', (d) => d.shape.color || '#808080')
        .call(rectDrag)
        .on('contextmenu', (event, d) => {
          event.preventDefault()
          setContextMenu({ x: event.clientX, y: event.clientY });
          setSelectedShape(d)
        })
      svg
        .selectAll('foreignObject.road')
        .data(shapes.filter((shape) => shape.shape.type === 'road'))
        .enter()
        .append('foreignObject')
        .attr('class', 'road')
        .attr('x', (d) => d.x - 65 / 2)
        .attr('y', (d) => d.y - (d.height || 700) / 2)
        .attr('width', 65)
        .attr('height', (d) => d.height || 700)
        .append('xhtml:div')
        .style('display', 'flex')
        .style('align-items', 'center')
        .style('justify-content', 'space-between')
        .style('flex-direction', 'column')
        .style('height', '100%')
        .style('gap', '10px')
        .style('width', '100%')
        .style('border-top', '5px solid red')
        .style('padding', '2px 0 0 0')
        .html(
          (d) => `
    <h3 style="margin: 0; color: white;">${d.shape.endText}</h3>
    ${d.shape?.icons
      ?.map((icon) =>
        icon.icon === 'arrowUpRight' ? renderIcon(icon.icon) : ''
      )
      .join('')}
      
    <div style="width: 45px; height: 45px; border-radius: 50%; background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-size: 10px; color: black;">
      <p style="margin: 0; font-size: 20px; font-weight: 700; line-height: 22px; color: ${
        d.shape.color
      };">${d.shape.speed}</p>
      <p style="margin: 0; font-size: 11px; font-weight: 600; line-height: 10px; color: ${
        d.shape.color
      };">${d.shape.speedUnit}</p>
    </div>
    <svg width="65px" height="30px" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect x="6" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
        <rect x="16.5" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
        <rect x="27" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
        <rect x="37.5" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
        <rect x="48.5" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
      </g>
      
    </svg>
     ${d.shape?.icons
       ?.map((icon) =>
         icon.icon === 'arrowUpIcon' ? renderIcon(icon.icon) : ''
       )
       .join('')}
      <div style="width: 45px; height: 45px; border-radius: 50%; background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-size: 10px; color: black;">
      <p style="margin: 0; font-size: 20px; font-weight: 700; line-height: 22px; color: ${
        d.shape.color
      };">${d.shape.speed}</p>
      <p style="margin: 0; font-size: 11px; font-weight: 600; line-height: 10px; color: ${
        d.shape.color
      };">${d.shape.speedUnit}</p>
    </div>
    ${d.shape?.icons
      ?.map((icon) =>
        icon.icon === 'arrowUpIcon' ? renderIcon(icon.icon) : ''
      )
      .join('')}
        <svg width="65px" height="30px" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect x="6" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
        <rect x="16.5" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
        <rect x="27" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
        <rect x="37.5" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
        <rect x="48.5" y="0" width="8px" height="30px" fill="white" rx="1.3" ry="1.3"/>
      </g>
    </svg>
    <div style="width: 45px; height: 45px; border-radius: 50%; background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-size: 10px; color: black;">
      <p style="margin: 0; font-size: 20px; font-weight: 700; line-height: 22px; color: ${
        d.shape.color
      };">${d.shape.speed}</p>
      <p style="margin: 0; font-size: 11px; font-weight: 600; line-height: 10px; color: ${
        d.shape.color
      };">${d.shape.speedUnit}</p>
    </div>
    ${d.shape?.icons
      ?.map((icon) =>
        icon.icon === 'arrowUpIcon' ? renderIcon(icon.icon) : ''
      )
      .join('')}
    <h3 style="margin: 0; padding: 0 1px; text-align: center; font-size: 12px; color: white;">${
      d.shape.startText
    }</h3>
    <div style="margin-bottom: 12px;">
      <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="10" fill="white"/>
      </svg>
    </div>
  `
        )

      svg
        .selectAll('rect.overlay.road')
        .data(shapes.filter((shape) => shape.shape.type === 'road'))
        .enter()
        .append('rect')
        .attr('class', 'overlay road')
        .attr('x', (d) => d.x - 65 / 2)
        .attr('y', (d) => d.y - (d.height || 700) / 2)
        .attr('width', 65)
        .attr('height', (d) => d.height || 700)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .call(rectDrag)
        .on('contextmenu', (event, d) => {
          event.preventDefault()
          setContextMenu({ x: event.clientX, y: event.clientY });
          setSelectedShape(d)
        })
      //end road

      function renderIcon(icon: string) {
        switch (icon) {
          case 'wasteIcon':
            return ReactDOMServer.renderToStaticMarkup(<WasteIcon />)
          case 'notAssing':
            return ReactDOMServer.renderToStaticMarkup(<NotAssingIcon />)
          case 'handicapIcon':
            return ReactDOMServer.renderToStaticMarkup(<HandicapIcon />)
          case 'parkingIcon':
            return ReactDOMServer.renderToStaticMarkup(<ParckingSpotIcon />)
          case 'arrowUpIcon':
            return ReactDOMServer.renderToStaticMarkup(<ArrowUpIcon />)
          case 'arrowUpRight':
            return ReactDOMServer.renderToStaticMarkup(<ArrowUpRightIcon />)
          default:
            return ''
        }
      }

      const textDrag = d3
        .drag<SVGTextElement, Shape>()
        .on('start', (event, d) => {
          setSelectedShape(d)
          d3.select(event.sourceEvent.target).raise()
        })
        .on('drag', (event, d) => {
          const newShapes = shapes.map((shape) => {
            if (shape === d) {
              return {
                ...shape,
                x: event.x,
                y: event.y,
              }
            }
            return shape
          })
          onShapesChange(newShapes)
        })

      svg
        .selectAll('text')
        .data(shapes.filter((shape) => shape.shape.type === 'Text'))
        .enter()
        .append('text')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y / 2 - 200)
        .attr('fill', (d) => d.textColor || 'black')
        .attr('font-size', (d) => d.fontSize || 16)
        .attr('font-weight', (d) => d.fontWeight || 'normal')
        .text((d) => d.text || '')
        .style('cursor', 'grab')
        .call(textDrag)
        .on('contextmenu', (event, d) => {
          event.preventDefault()
          setContextMenu({ x: event.clientX, y: event.clientY });
          setSelectedShape(d)
        })
    }, [shapes, canvasRef, selectedShape, onShapesChange])

 

    return (
      <div
        className={styles.canvas}
        ref={canvasRef}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onDuplicate={onDuplicate}
            onClose={() => setContextMenu(null)}
            
          />
        )}
      </div>
    )
  }
)

export default DrawingArea
