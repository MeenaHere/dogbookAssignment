/* eslint-disable react/prop-types */

import DogImage from "./DogImage";
import dogservices from "./dogservices";

function Create({ setdogs, setPage}) {
  
  const createId = () => {
    return Math.floor(Math.random() * 1000);
  };
  
   const addDog = async (event) => {
    event.preventDefault();
     const newDog = {
       id: createId(),
       name: event.target.name.value,
       nick: event.target.nick.value,
       age: event.target.age.value,
       bio: event.target.bio.value,
       present: false
    };
    const data = await dogservices.create(newDog);
    setdogs(data); 
    setPage("Start")
  };

  
  return (
    <>
      <h1 className="header">🐾Dogbook</h1>
      <form onSubmit={addDog}>
         <DogImage />
        Name <input id="name" type="text"  placeholder="Enter name"/>
        <br />
        Nickname <input id="nick" type="text"  placeholder="Enter nickname" />
        <br />
        Age <input type="number"  id="age" placeholder="Enter age"/><br />
        Bio <input id="bio" type="text" placeholder="Enter bio" /><br /><br />
        <br />
        <button>Save</button>        
      </form> <br />
      <a href="#" onClick={() => setPage("Start")}>  Go to Home Page</a>
    </>
  );
}

export default Create