import { useState } from 'react'

const Form = (props) => {

  const [formState,setFormState] = useState({name: "",url: ""})
  const handleChange = (event) => { setFormState({name: document.getElementById("name").value,url: document.getElementById("URL").value}) }

  const onFormSubmit = (event) => {
    // to prevent page reload on form submit
    event.preventDefault()
    props.handleSubmit(formState)
  }

  const submitForm = (event) => {
    onFormSubmit(event)
    document.getElementById("name").value = ""
    document.getElementById("URL").value = ""
    setFormState({name: "",URL: ""})
  }

  return (
    <div className="container">
    <form onSubmit={submitForm} >
      <div style={{borderBottom: '1px solid darkgrey',width: '80vw',padding: '10px'}}>
      <label for="name1">Name:</label><br></br>
      <input type="text" id="name" name="name1" onChange={handleChange} /><br></br>
      </div>
      <div style={{borderBottom: '1px solid darkgrey',width: '80vw',padding: '10px'}}>
      <label for="url1">URL:</label><br></br>
      <input type="text" id="URL" name="url1" onChange={handleChange}/><br></br>
      </div>
      <input type="submit" value="Submit" style={{margin: '10px'}}></input>
    </form>
     </div>
  )
}

export default Form
