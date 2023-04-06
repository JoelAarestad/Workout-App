import React, { useState } from 'react';

function ExerciseSender() {
  // Declare two state variables using the useState hook
  const [response, setResponse] = useState('') 
  const [formData, setFormData] = useState({}) // 

  // This function is called when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault()  // Prevent the form from submitting unless the button is clicked
    // Send a POST request to the server with the form data
    fetch('http://192.168.1.100:3000', {  
      method: 'POST', // Send a POST request
      headers: {  // Tell the server we're sending JSON data
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify(formData)  // Convert the form data to JSON
    })
      .then(res => res.text())
      // Set the response state variable to the server's response
      .then(res => setResponse(res))
  }

  // This function is called when an input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target
    // Update the form data state variable with the new value
    setFormData(prevState => ({ ...prevState, [name]: value }))   
  }

  // Render the component
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          {/* This input field will update the "name" property of the form data */}
          <input type="text" name="Exercise" onChange={handleInputChange} />
        </label>
        {/* This button will submit the form */}
        <button type="submit">Submit</button>
      </form>
      {/* Display the response from the server */}
      <p>Response from Node.js server: {response}</p>
    </div>
  )
}

// Export the component so it can be used in other files
export default ExerciseSender;
