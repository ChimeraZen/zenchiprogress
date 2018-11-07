import React, { Component } from 'react'

export default class ZenChiProgress extends Component {
  state = {
    // Title
    title: this.props.title ? this.props.title : false,                           // Default is false if no title prop is present
    titleTextColor: this.props.textColor ? this.props.textColor : '#000',         // Default title text color is #000 (black)
    
    // Styles
    background: this.props.background ? this.props.background : '#FFF',           // Default background is #FFF (white)
    baselineColor: this.props.baselineColor ? this.props.baselineColor : '#DDD',  // Default baseline color is #DDD
    
    // Progress text
    progressTextAlign: this.props.progressTextAlign                               // Default alignment for progress text is center
      ? this.props.progressTextAlign : 'center',
    progressTextBaseline: this.props.progressTextBaseline                         // Default baseline for progress text is middle
      ? this.props.progressTextBaseline : 'middle',
    
    // Stroke
    borderColor: this.props.borderColor ? this.props.borderColor : '#DDD',        // Default border color is #DDD
    barColor: this.props.barColor ? this.props.barColor : '#2196F3',
    lineCap: this.props.lineCap ? this.props.lineCap : 'butt',
    
    // Parameters
    padding: this.props.padding ? this.props.padding : 10,                        // Default padding is 10
    speed: this.props.speed ? this.props.speed : 1.25,                            // Default speed is 1.25x
    percentage: this.props.percentage ? this.props.percentage : 75,               // Default percentage is 75%
    max: this.props.max ? this.props.max : 100,                                   // Default max is 100%
    type: this.props.type ? this.props.type : 'radial',                           // Default progress type is radial
  }


  // Canvas Ref
  canvasRef = React.createRef()


  componentDidMount() {
    // Set the canvas reference
    this.canvasRef = this.canvasRef.current
    
    // Set the canvas context
    this.ctx = this.canvasRef.getContext('2d')
    
    // Set the context progress
    this.ctx.progress = 0
    
    // Set the base font
    this.ctx.font = 'normal 18px Roboto'
    
    // Set the canvas context width & height
    this.canvasRef.width = this.state.title
      ? this.ctx.measureText(this.state.title).width > (this.canvasRef.width - this.state.padding * 2)
        ? this.ctx.measureText(this.state.title).width + (this.state.padding * 8)
        : this.canvasRef.width
      : this.canvasRef.width
    
    this.ctx.width = this.canvasRef.width
    this.ctx.height = this.canvasRef.height
    
    // Set the context centerX, centerY and radius
    this.ctx.cX = this.ctx.width/2
    this.ctx.cY = this.ctx.height/2
    this.ctx.radius = this.ctx.height/3.5
    
    // Draw the Progress Baseline
    this.drawProgressBaseline(this.canvasRef.width/3)
    
    // Begin the main loop
    this.mainLoop()
  }
  


  // The main loop uses the requestAnimationFrame API to ensure a consistent framerate
  mainLoop = () => {
    const ctx = this.ctx
    
    if(ctx.progress <= this.state.percentage) {
      // Clear the canvas
      ctx.clearRect(0, 0, ctx.width, ctx.height)
    
      // Draw the background
      this.drawBackground()
      
      // Draw the border if true
      this.props.withBorder && this.drawBorder()
      
      // Draw the title if title exists
      this.state.title && this.drawTitle()
      
      // Draw the Progress Baseline
      this.drawProgressBaseline()

      // Draw the current progress
      this.drawProgress()

      // Draw the current progress in text
      this.drawProgressText()
      
      // Increase the current progress
      ctx.progress = ctx.progress + (1 * this.state.speed)
      
      // Loop using the requestAnimationFrame API
      requestAnimationFrame(this.mainLoop)
    }
  }
  
  
  // Draw the background
  drawBackground = () => {
    const ctx = this.ctx
    
    ctx.save()
    ctx.fillStyle = this.state.background
    ctx.fillRect(0, 0, ctx.width, ctx.height)
    ctx.restore()
  }
  
  
  
  // Draw a border around the canvas
  drawBorder = () => {
    const ctx = this.ctx,
          padding = this.state.padding,
          cornerRadius = 10
    
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(padding + cornerRadius, padding)
    
    // Border top
    ctx.lineTo(ctx.width - padding - cornerRadius, padding)
    
    
    // Border top-right radius
    ctx.arcTo(ctx.width - padding, padding,                               // x1/y1
              ctx.width - padding, ctx.height + padding + cornerRadius,   // x2/y2
              cornerRadius)                                               // Radius
    
    
    // Border right
    ctx.lineTo(ctx.width - padding, ctx.height - padding - cornerRadius)
    
    
    // Border bottom-right radius
    ctx.arcTo(ctx.width - padding, ctx.height - padding,
              ctx.width - padding - cornerRadius, ctx.height - padding,
              cornerRadius)
    
    
    // Border bottom
    ctx.lineTo(padding + cornerRadius, ctx.height - padding)
    
    
    // Border bottom-left radius
    ctx.arcTo(padding, ctx.height - padding,
              padding, ctx.height - padding - cornerRadius,
              cornerRadius)
    
    
    // Border left
    ctx.lineTo(padding, padding + cornerRadius)
    
    
    // Border top-left radius
    ctx.arcTo(padding, padding,
              padding + cornerRadius, padding,
              cornerRadius)
    
    ctx.lineWidth = 2
    ctx.strokeStyle = this.state.borderColor
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }
  
  
  
  // Draw the title
  drawTitle = () => {
    const ctx = this.ctx
    
    // Save the context
    ctx.save()
    
    // Draw the background
    ctx.fillStyle = this.state.background
    ctx.font = 'normal 18px Roboto'
    ctx.fillRect(this.state.padding * 2, 0,                                         // X, Y
                 ctx.measureText(this.state.title).width + this.state.padding * 2,  // Width
                 this.state.padding * 2)                                            // Height
    
    // Draw the title
    ctx.fillStyle = this.state.titleTextColor
    ctx.fillText(this.state.title, 
                 this.state.padding * 3, 
                 this.state.padding * 2 - this.state.padding/2)
    
    // Restore the context
    ctx.restore()
  }
  
  
  
  // Draw a base line 
  drawProgressBaseline = () => {
    const ctx = this.ctx
    
    // Save the context and begin the path
    ctx.save()
    ctx.beginPath()
    
    switch(this.state.type) {
      case 'bar':
        ctx.lineWidth = 20
        ctx.moveTo(0, ctx.cY)
        ctx.lineTo(ctx.width, ctx.cY)
        ctx.strokeStyle = this.state.baselineColor
        ctx.stroke()
      break;
        
      case 'radial':
        // Rotate the startAngle to top
        this.centerRotate(-90 * Math.PI / 180)

        ctx.arc(0, 0, ctx.radius, 0, 2*Math.PI)
        ctx.lineWidth = 4
        ctx.strokeStyle = this.state.baselineColor
        ctx.stroke()
      break;
        
      default:
      break;
    }
    
    // Close the path and restore the context
    ctx.closePath()
    ctx.restore()
  }
  
  
  
  // Draw the progress
  drawProgress = () => {
    const ctx = this.ctx
    let startAngle = 0,
        endAngle = 2 * Math.PI
    
    // Save the context and begin the path
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = this.state.barColor
    
    switch(this.state.type) {
      case 'bar':
        ctx.lineWidth = 20
        ctx.moveTo(0, ctx.cY)
        ctx.lineTo(ctx.progress, ctx.cY)
        ctx.stroke()
      break;
        
      case 'radial':
        startAngle = 0
        endAngle = 2*Math.PI*(ctx.progress/this.state.max)
        
        // Rotate the startAngle to top
        this.centerRotate(-90 * Math.PI / 180)

        ctx.lineCap = this.state.lineCap
        ctx.lineWidth = 10
        
        ctx.arc(0, 0, ctx.radius, startAngle, endAngle)
        ctx.stroke()
      break;
        
      default:
      break;
    }
    
        
    // Close the path and restore the context
    ctx.closePath()
    ctx.restore()
  }
  
  
  // Draw the current progress as a percentage
  drawProgressText = () => {
    const ctx = this.ctx
    
    // Save the context
    ctx.save()
    
    // Apply progress text styles
    ctx.textAlign = this.state.progressTextAlign
    ctx.textBaseline = this.state.progressTextBaseline
    ctx.font = 'bold 24px Roboto'
    
    // Draw current progress
    ctx.fillText(Math.round(ctx.progress) + '%', ctx.cX, ctx.cY)
    
    // Restore the context
    ctx.restore()
  }
  
  
  // Translate to canvas center and rotate the context to ANGLE
  centerRotate = (angle) => {
    const ctx = this.ctx
    
    ctx.translate(ctx.cX, ctx.cY)
    ctx.rotate(angle)
  }
  
  render() {
    return <canvas ref={this.canvasRef} width={this.props.width ? this.props.width : '150'} height={this.props.height ? this.props.height : 'auto'}></canvas>
  }
}
