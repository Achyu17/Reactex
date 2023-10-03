import React from 'react';
import {useState,useEffect} from 'react';

function Read()
{
    const[inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
      
      const handleSubmit = async (event) => {
    
        //alert("in submit");
        event.preventDefault();
        //alert(inputs);
        //console.log(event);
       
        //alert(event)
        
    
      }
    
    return (
    
     
     <>Read</>)

    };

    export default Read; 