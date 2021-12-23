import React, { useState, useEffect } from "react";
import './App.css';
// import getGitHubUserWithFetch from "./environment"
const userdataurl ="https://jsonplaceholder.typicode.com/todos"
export default function App() {
  const [userData, setUserData] = useState([]);
  const [searchitem, Setsearchitem ] =  useState("")
  const getUserDataWithFetch = async () => {
    const response = await fetch(userdataurl);
    const jsonData = await response.json();
    // console.log(jsonData)
    setUserData(jsonData);
    
  };
 
  useEffect(() => {
    getUserDataWithFetch();
  }, [userData]);
  
  // console.log(userData)
  return (
   <div>
   <div className='text-box'>
      <input type="text" placeholder='search' className='input_box'
      onChange={(event)=>{Setsearchitem(event.target.value)}}></input>
      </div>
   <table className="table_outlet">
   <tbody>
      <tr key={"header"}>
        {userData && userData[0]&& Object.keys(userData[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {userData?.filter((vl)=>{
        if (searchitem ==""){
          return vl
        }else if (vl.title.toLowerCase().includes(searchitem.toLowerCase()) || vl.completed.toString().toLowerCase().includes(searchitem.toLowerCase()) || vl.id.toString().toLowerCase().includes(searchitem.toLowerCase()) || vl.userId.toString().toLowerCase().includes(searchitem.toLowerCase()) ) {
          return vl
        }
      })
      .map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val.toString()}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
   </div>
  )
}

