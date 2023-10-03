
import React from 'react';

import {useState,useEffect} from 'react';
import axios from 'axios';

function Home() {
  
  const[inputs, setInputs] = useState({});
  const[data, setData]=useState([]);
  useEffect(()=>{
axios.get('http://localhost:5000/api/get')
.then(res=>setData(res.data))
.catch(err=>console.log(err));
  },[]);
  
  
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
       /*<form  action="http://localhost:5000/api/add" method="POST">
        

          <div align="center"> <h1> City Details </h1> </div>
                  <label >City:<input type="text" name ="cname" value = {inputs.cname || "" } onChange={handleChange}/></label> <br/>
        <label>Latitude:<input type="text" name ="clat" value = {inputs.clat || ""} onChange={handleChange}/></label><br/>
        <label>Longitude:<input type="text" name="clon" value = {inputs.clon || ""} onChange={handleChange}/></label><br/>
        <input value ="Add" type="submit"/>
        <input value ="Del" type="submit"/>
      
      </form>
      
      /*<form  action="http://localhost:5000/delete/:Hubbali" method="DELETE">
        


<div align="center"> <h1> City Details </h1> </div>
       


<input value ="Del" type="submit"/>

</form>
     )}*/
     
     
      <div>
<div>

  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>City</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th> Edit</th>
      </tr>
      </thead>
    <tbody>
{data.map((Cities,index)=>{
  return <tr key={index}>
    <td>{Cities.id}</td>
  <td>{Cities.City}</td>
  <td>{Cities.Latitude}</td>
  <td>{Cities.Longitude}</td>
  <td>
<button>Edit</button>
<button>Delete</button>
 </td>
  </tr>

})}
  </tbody>
  </table>
</div>

      </div>
     )
     };
  
  export default Home;
  