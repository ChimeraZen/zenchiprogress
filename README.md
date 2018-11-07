# ZenChi Progress
  
**Description**:  The ZenChi Progress component uses React v16.6 and the HTML5 canvas element
                  to draw a progress bar that uses the requestAnimationFrame API

**Version**:      [1.0.1](#v101)  
**Author**:       Elijah Liedtke (Chimera.Zen)  
**Link**:         https://github.com/ChimeraZen/ZenChiProgress

**Copyright**:    Copyright (c) 2018, Elijah Liedtke  
**License**:      http://www.gnu.org/licenses/old-licenses/gpl-2.0.html

## Table of Contents
1. [Instructions](#instructions)
    1. [Props](#props)
2. [ChangeLog](#changelog)

---

## Instructions

```
<ZenChiProgress 
  title="Example" 
  withBorder
  max={100} 
  percentage={80} 
  speed={2} 
  type='radial'
  lineCap='round'
/>
```

## Props
### Parameters

Name        |Type     |Default|Syntax                                      |Description
------------|---------|-------|--------------------------------------------|-------------------------------
title       |string   |false  |string \| false                             |Default is false if no title prop is present
type        |string   |radial |'radial \| bar'                           |Type
max         |number   |100    |                                            |Default max is 100
percentage  |number   |75     |                                            |Default percentage is 75
percentages |array    |       |{**value**: *number*, **label**: *string*}  |Array of objects
speed       |number   |1.25   |                                            |Rate of progress increase between requested animation frames
withBorder  |boolean  |false  |true \| false                               |**True** if included as component prop, otherwise default is **false**


### Dimensions

Name           |Type     |Default|Syntax          |Description
---------------|---------|-------|----------------|-------------------------------------
width          |number   |150    |                |Canvas width default is 150px
height         |number   |auto   |                |Canvas width default is **auto**


### Styles

Name                |Type     |Default|Syntax                             |Description
--------------------|---------|-------|-----------------------------------|----------------------------------------
background          |string   |#FFF   |RGB\/A \| HEX \| COLOR             |Background color for canvas
progressTextAlign   |string   |center |'center\|end\|left\|right\|start'  |Default alignment for progress text is **center**


### Stroke

Name           |Type     |Default |Syntax                  |Description
---------------|---------|--------|------------------------|----------------
titleTextColor |string   |#000    |RGB\/A \| HEX \| COLOR  |Title text color 
baselineColor  |string   |#DDD    |RGB\/A \| HEX \| COLOR  |Baseline color
borderColor    |string   |#DDD    |RGB\/A \| HEX \| COLOR  |Border color
barColor       |string   |#2196F3 |RGB\/A \| HEX \| COLOR  |Bar color

---

## ChangeLog
### v1.0.1
* Update for NPM



### v1.0.0
* Version 1.0.0
