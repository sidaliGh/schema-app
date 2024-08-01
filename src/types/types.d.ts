
interface ShapeProperties {
    name?: string
    parkingType?: string
    wasteBinCategorie?: string
    speed?: number
    spotNumber?: number
    endText?: string
    startText?: string
  
    speedUnit?: string
    type: string
    color?: string
    icon?: string
    icons?: { icon: string }[]
  }
  
  interface Shape {
    id: string
    shape: ShapeProperties
    x: number
    y: number
    height?: number
    isFliped?: boolean
    rotation?: number
    color?: string
    text?: string
    fontSize?: number
    fontWeight?: string
    textColor?: string
    marginTop?: number
    marginBottom?: number
  }
  
  export { Shape, ShapeProperties };