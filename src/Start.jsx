/* eslint-disable react/prop-types */

import dogservices from "./dogservices";
import DogImage from "./DogImage";

function Start({ setDog, setPage, dogs, setDogs }) {
  console.log("startpage",dogs)
  const setDogPage = (dog) => {
    setDog(dog)
    setPage("Profile")
  }
  
  const addDog = () => {
    setPage("Create")
  }
  const deleteHandler = async (id) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
    await dogservices.remove(id);
  };
  return (
      <div className="container">
      <h1 className="header">🐾Dogbook</h1>
      <h2>Users</h2>
      <div className="main">
        <ul className="section">
          {dogs.map(dog => 
            <li key={dog.id} className="dog">
              <DogImage />
              <a href="#" className={dog.present?"green" : "red"} onClick={() => setDogPage(dog)} alt="dog" >@{dog.nick}</a>
              <button onClick={() => deleteHandler(dog.id)}>Delete</button>
            </li>
          )}       
        </ul>
      </div>
      <button onClick={addDog}>Add a new Dog</button>
    </div>
  );
}

export default Start