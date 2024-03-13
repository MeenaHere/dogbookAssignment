/* eslint-disable react/prop-types */
import DogImage from "./DogImage";
import dogservices from "./dogservices";

function Edit({setPage, dog, dogs, setdogs}) {

   const editDog = async (id) => {
    const dog = dogs.find((dog) => dog.id === id);
    const newdog = { ...dog, important: !dog.important };
    const data = await dogservices.change(id, newdog);
    setdogs(dogs.map((dog) => (dog.id !== id ? dog : data)));
  };
  return (
    <>
      <h1 className="header">🐾Dogbook</h1>
      <form onSubmit={editDog}>
         <DogImage />
        Name <input id="name" type="text" value={dog.name} />
        <br />
        Nickname <input id="nick" type="text" value={dog.nick}  />
        <br />
        Age <input type="number"  id="age" value={dog.age} /><br />
        Bio <input id="bio" type="text" value={dog.bio} /><br /><br />
        <br />
        <button>Save</button>        
      </form> <br />
      <a href="#" onClick={() => setPage("Start")}>  Go to Home Page</a>
    </>
  )
}

export default Edit