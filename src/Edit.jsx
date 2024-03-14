/* eslint-disable react/prop-types */
import DogImage from "./DogImage";
import dogservices from "./dogservices";

function Edit({ setPage, dog, dogs, setDogs, setDog }) {

  const editDog = async (event) => {
    event.preventDefault();
    const id = dog.id
    const fName = event.target.friend.value
    const friends = dog.friends
    if (fName !== "") {
      console.log("editdog", fName)
      friends.push({
        id: Math.floor(Math.random() * 1000),
        friendName: event.target.friend.value,
      });
    }
    setDog({ ...dog, friends: friends })
    const data = await dogservices.change(id, {...dog, friends: friends});
    console.log("dog", data)
    setDogs(data);
    setPage("Profile")
  };
  return (
    <>
      <h1 className="header">🐾Dogbook</h1>
      <form onSubmit={editDog}>
         <DogImage />
        Name <input type="text" id="name" value={dog.name} onChange={(e) =>
          setDog({ ...dog, name: e.target.value })} />
        <br />
        Nickname <input type="text" id="nick" value={dog.nick} onChange={(e) =>
          setDog({ ...dog, nick: e.target.value })} />
        <br />
        Age <input type="text" id="age" value={dog.age} onChange={(e) =>
          setDog({ ...dog, age: e.target.value })} />
        <br />
        Bio <input type="text" id="bio" value={dog.bio} onChange={(e) =>
          setDog({ ...dog, bio: e.target.value })} />
        <br />
        <ul>Friends:
          {dog.friends.map(friend => 
            <li key={friend.id}>{friend.friendName}
            </li>
          )}       
        </ul>
        <select name="friend" id="friend" >
          <option value="">Select a friend</option>
          {dogs.map(d => {
            if (d.name !== dog.name) {
              return(
              <option  key={d.id} value={d.name} >
                {d.name}
              </option>);
            }
          }
          )}
        </select>
        <button>Save</button>        
      </form> <br />
      <a href="#" onClick={() => setPage("Start")}>  Go to Home Page</a>
    </>
  )
}

export default Edit