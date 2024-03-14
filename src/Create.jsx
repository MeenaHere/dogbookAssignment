/* eslint-disable react/prop-types */

import DogImage from "./DogImage";
import dogservices from "./dogservices";

function Create({ setDogs, setPage, dogs }) {
  
  const createId = () => {
    return Math.floor(Math.random() * 1000);
  };

  const createFriend = (friendName) => {
    const friend = {
      id: createId(),
      friendName: friendName,
    }
    return friend
  }
  
  const addDog = async (event) => {
    event.preventDefault();
    const friendName = event.target.friend.value;
    const newDog = {
      id: createId(),
      name: event.target.name.value,
      nick: event.target.nick.value,
      age: event.target.age.value,
      bio: event.target.bio.value,
      present: false,
      friends: createFriend(friendName)
    };
    const data = await dogservices.create(newDog);
    setDogs([...dogs, data]);
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
        <select name="friend" id="">
          <option value="friend">Select a friend</option>
          {console.log(dogs)}
          {dogs.map(dog =>
            <option key={dog.id} value={dog.name}>
            {dog.name}
            </option>
          )}
        </select>
        <br />
        <button>Save</button>        
      </form> <br />
      <a href="#" onClick={() => setPage("Start")}>  Go to Home Page</a>
    </>
  );
}

export default Create