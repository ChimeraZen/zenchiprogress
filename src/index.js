import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import Progress from './lib/Progress'


ReactDOM.render(<Progress 
                  //title="Example" 
                  //withBorder
                  max={100} 
                  percentage={80} 
                  speed={2} 
                  type='radial'
                  lineCap='round'
                  //width="100px"
                  //height="20px"
                  />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
