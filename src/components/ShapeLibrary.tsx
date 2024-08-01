import React, { useState } from 'react'
import styles from './ShapeLibrary.module.scss'
import WasteIcon from '../assets/icons/WasteIcon'
import NotAssingIcon from '../assets/icons/NotAssingIcon'
import HandicapIcon from '../assets/icons/HandicapIcon'
import ParckingSpotIcon from '../assets/icons/ParckingSpotIcon'
import ArrowUpIcon from '../assets/icons/ArrowUpIcon'
import ArrowUpRightIcon from '../assets/icons/ArrowUpRightIcon'
import { ShapeProperties } from '../types/types'

interface ShapeLibraryProps {
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    shape: ShapeProperties
  ) => void
}

const wasteBins = [
  {
    name: 'Reuse Books',
    wasteBinCategorie: 'reuseBooks',
    type: 'wasteBin',
    color: '#0540bf',
    icon: 'wasteIcon',
  },
  {
    name: 'Soil',
    wasteBinCategorie: 'soil',
    type: 'wasteBin',
    color: '#f54f02',
    icon: 'wasteIcon',
  },
  {
    name: 'Paper',
    wasteBinCategorie: 'paper',
    type: 'wasteBin',
    color: '#02aff5',
    icon: 'wasteIcon',
  },
  {
    name: 'Plaster Board',
    wasteBinCategorie: 'plasterBoard',
    type: 'wasteBin',
    color: '#f502c9',
    icon: 'wasteIcon',
  },
  {
    name: 'Wood & Timber',
    wasteBinCategorie: 'woodTimber',
    type: 'wasteBin',
    color: '#8B572A',
    icon: 'wasteIcon',
  },
  {
    name: 'upholstered Seating',
    wasteBinCategorie: 'upholsteredSeating',
    type: 'wasteBin',
    color: 'orange',
    icon: 'wasteIcon',
  },
  {
    name: 'Card Board',
    wasteBinCategorie: 'cardBoard',
    type: 'wasteBin',
    color: '#0DB2D4',
    icon: 'wasteIcon',
  },
  {
    name: 'Scrap Metal',
    wasteBinCategorie: 'scrapMetal',
    type: 'wasteBin',
    color: '#9189BD',
    icon: 'wasteIcon',
  },
  {
    name: 'Not Assigned',
    wasteBinCategorie: 'notAssigned',
    type: 'wasteBin',
    color: '#767483',
    icon: 'notAssing',
  },
]

const parkingSpots = [
  {
    parkingType: 'handicap',
    type: 'parkingSpot',
    color: '#173CFC',
    icon: 'handicapIcon',
  },
  {
    parkingType: 'normal',
    type: 'parkingSpot',
    color: '#0AEE6E',
    icon: 'parkingIcon',
  },
]
const spotNumber = {
  type: 'spotNumber',
  spotNumber: 0,
}
const road = {
  type: 'road',
  speed: 5,
  speedUnit: 'MPH',
  startText: 'YOU ARE HERE',
  endText: 'EXIT',
  color: '#61708B',
  icons: [{ icon: 'arrowUpIcon' }, { icon: 'arrowUpRight' }],
}

const IconComponent: React.FC<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case 'wasteIcon':
      return <WasteIcon />
    case 'notAssing':
      return <NotAssingIcon />
    case 'handicapIcon':
      return <HandicapIcon />
    case 'parkingIcon':
      return <ParckingSpotIcon />
    case 'arrowUpIcon':
      return <ArrowUpIcon />
    case 'arrowUpRight':
      return <ArrowUpRightIcon />
    default:
      return null
  }
}

const SpeedLimitSign: React.FC<{
  color: string
  speed: number
  speedUnit: string
}> = ({ speed, speedUnit, color }) => (
  <div
    style={{
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '10px',
      color: 'black',
    }}
  >
    <p
      style={{
        margin: 0,
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '22px',
        color,
      }}
    >
      {speed}
    </p>
    <p
      style={{
        margin: 0,
        fontSize: '11px',
        fontWeight: 600,
        lineHeight: '10px',
        color,
      }}
    >
      {speedUnit}
    </p>
  </div>
)

const DashedLine = () => (
  <svg width='65px' height='30px' xmlns='http://www.w3.org/2000/svg'>
    <g>
      <rect
        x='6'
        y='0'
        width='8px'
        height='30px'
        fill='white'
        rx='1.3'
        ry='1.3'
      />
      <rect
        x='16.5'
        y='0'
        width='8px'
        height='30px'
        fill='white'
        rx='1.3'
        ry='1.3'
      />
      <rect
        x='27'
        y='0'
        width='8px'
        height='30px'
        fill='white'
        rx='1.3'
        ry='1.3'
      />
      <rect
        x='37.5'
        y='0'
        width='8px'
        height='30px'
        fill='white'
        rx='1.3'
        ry='1.3'
      />
      <rect
        x='48.5'
        y='0'
        width='8px'
        height='30px'
        fill='white'
        rx='1.3'
        ry='1.3'
      />
    </g>
  </svg>
)

const ShapeLibrary: React.FC<ShapeLibraryProps> = ({ onDragStart }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredWasteBins = wasteBins.filter(bin =>
    bin.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return(
  <div className={styles.libraryContainer}>
    <h3 className={styles.title}>Elements</h3>
    <div className={styles.parkingSpotsContainer}>
      <h4 className={styles.title}>Parking Spots</h4>

      <div
        className={styles.shapeContainer}
        style={{marginLeft: "9px", marginBottom: "10px"}}
        draggable
        onDragStart={(e) => onDragStart(e, spotNumber)}
      >
        <div
          style={{
            height: '40px',
            width: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: "column",
            borderRight: "2px solid black",
            borderTop: "2px solid black",
            borderBottom: "2px solid black",
            

          }}
        >
          <span >{spotNumber.spotNumber}</span>
        </div>
      </div>
      {parkingSpots.map((shape) => (
        <div
          key={shape.icon}
          className={styles.shapeContainer}
          draggable
          onDragStart={(e) => onDragStart(e, shape)}
        >
          <svg width='60' height='60' xmlns='http://www.w3.org/2000/svg'>
            <rect
              x='15'
              y='30'
              width='50'
              height='30'
              fill={shape.color}
              rx='8'
              ry='8'
              transform='rotate(30, 60, 25)'
            />
            <foreignObject
              x={shape.parkingType === 'handicap' ? '12' : '14'}
              y={shape.parkingType === 'handicap' ? '10' : '15'}
              width='40'
              height='50'
            >
              <div
                style={{
                  transform: `rotate(${
                    shape.parkingType === 'handicap' ? '-50deg' : '-58deg'
                  })`,
                  textAlign: 'center',
                }}
              >
                {shape.icon && <IconComponent icon={shape.icon} />}
              </div>
            </foreignObject>
          </svg>
        </div>
      ))}
    </div>
    <div className={styles.wasteBinsContainer}>
      <div className={styles.topContainer}>
        <h4 className={styles.title}>Waste Bins</h4>
        <input
            type="text"
            placeholder="Search waste bins..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearch}
        
          />
      </div>
      <div className={styles.bottomContainer}>
        {filteredWasteBins.map((shape) => (
          <div
            key={shape.wasteBinCategorie}
            className={styles.shapeContainer}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
          >
            <svg width='180' height='70' xmlns='http://www.w3.org/2000/svg'>
              <rect
                x='10'
                y='10'
                width='130'
                height='50'
                fill={shape.color}
                rx='8'
                ry='8'
              />
              <foreignObject x='14' y='12' width='120' height='48'>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      shape.wasteBinCategorie === 'notAssigned'
                        ? 'center'
                        : 'space-between',
                    height: '100%',
                    gap: '10px',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      flex:
                        shape.wasteBinCategorie === 'notAssigned' ? 1 : undefined,
                      textAlign:
                        shape.wasteBinCategorie === 'notAssigned'
                          ? 'center'
                          : undefined,
                    }}
                    className={styles.left}
                  >
                    {shape.icon && <IconComponent icon={shape.icon} />}
                  </div>
                  {shape.wasteBinCategorie !== 'notAssigned' && (
                    <div className={styles.right}>
                      <p
                        style={{
                          margin: 0,
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        {shape.name}
                      </p>
                    </div>
                  )}
                </div>
              </foreignObject>
            </svg>
          </div>
        ))}
      </div>
    </div>
    <div className={styles.roadContainer}>
      <h4 className={styles.title}>Road</h4>
      <div
        key={road.type}
        className={styles.shapeContainer}
        draggable
        onDragStart={(e) => onDragStart(e, road)}
      >
        <svg width='65' height='700' xmlns='http://www.w3.org/2000/svg'>
          <rect x='10' y='10' width='65' height='700' fill={road.color} />
          <foreignObject x='10' y='10' width='56' height='700'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '100%',
                gap: '10px',
                width: '100%',
                borderTop: '4px solid red',
                padding: '2px 0 0px 0',
              }}
            >
              <h3 style={{ margin: 0, color: 'white' }}>{road.endText}</h3>
              {road.icons.map(
                (icon, index) =>
                  icon.icon === 'arrowUpRight' && (
                    <IconComponent key={index} icon={icon.icon} />
                  )
              )}
              <SpeedLimitSign
                speed={road.speed}
                speedUnit={road.speedUnit}
                color={road.color}
              />
              <DashedLine />
              {road.icons.map(
                (icon, index) =>
                  icon.icon === 'arrowUpIcon' && (
                    <IconComponent key={index} icon={icon.icon} />
                  )
              )}
              <SpeedLimitSign
                speed={road.speed}
                speedUnit={road.speedUnit}
                color={road.color}
              />
              {road.icons.map(
                (icon, index) =>
                  icon.icon === 'arrowUpIcon' && (
                    <IconComponent key={index} icon={icon.icon} />
                  )
              )}

              <DashedLine />
              <SpeedLimitSign
                speed={road.speed}
                speedUnit={road.speedUnit}
                color={road.color}
              />
              {road.icons.map(
                (icon, index) =>
                  icon.icon === 'arrowUpIcon' && (
                    <IconComponent key={index} icon={icon.icon} />
                  )
              )}

              <h3
                style={{
                  margin: 0,
                  padding: '0 1px',
                  textAlign: 'center',
                  fontSize: '12px',
                  color: 'white',
                }}
              >
                {road.startText}
              </h3>
              <div style={{ marginBottom: '12px' }}>
                <svg
                  width='30px'
                  height='30px'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='15' cy='15' r='10' fill='white' />
                </svg>
              </div>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  </div>
)}

export default ShapeLibrary
