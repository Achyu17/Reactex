import React from 'react';
import {useState,useEffect} from 'react';

function Create()
{
    const[inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
      
      const handleSubmit = async (event) => {
    
        alert("in submit");
        event.preventDefault();
        //alert(inputs);
        //console.log(event);
       
        //alert(event)
        
    
      }
    
    return (
    // <form onSubmit={handleSubmit} action="http://localhost:5000/add" method="POST">
      <form  action="http://localhost:5000/api/add" method="POST">
       

         <div align="center"> <h1> City Details </h1> </div>
                 <label >City:<input type="text" name ="cname" value = {inputs.cname || "" } onChange={handleChange}/></label> <br/>
       <label>Latitude:<input type="text" name ="clat" value = {inputs.clat || ""} onChange={handleChange}/></label><br/>
       <label>Longitude:<input type="text" name="clon" value = {inputs.clon || ""} onChange={handleChange}/></label><br/>
       <input value ="Add" type="submit"/>
       </form> )

    };

    export default Create; 