import React from 'react'
import ExerciseSender from './components/ExerciseSender.js'
import ParentComponent from './components/ParentComponent.js'
import './App.css'

function App() {
  return (
    <div class = "container">
 
      <ExerciseSender />
      <ParentComponent/>
     
    </div>
  )
}

export default App
