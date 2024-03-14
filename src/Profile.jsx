/* eslint-disable react/prop-types */
import DogImage from "./DogImage";
import dogservices from "./dogservices";


function Profile({ dog, setPage, setDog }) {

  const presentHandler = async (event) => {
    event.preventDefault()
    const id = dog.id
    console.log("dog before change", dog)

    const data = await dogservices.change(id, { ...dog, present: !dog.present });
    console.log("data", data)
    setDog({ ...dog, present: data.present })
    
  }

  const deleteHandler = () => {
   
 }
  
  const editHandler = () => {
    setPage("Edit")    
  }
  return (
    <>
      <h1 className="header">🐾Dogbook</h1>
      <h2>{dog.name }</h2>
      <div className="main">
        <div className="imgdiv">
          <DogImage />
        </div>
        <div className="infodiv">
          <p>Name: {dog.name}  <a href="#" onClick={editHandler}> Edit</a></p>
          <p>Nick: {dog.nick}</p>
          <p>Age: {dog.age}</p>
          <p>Bio: {dog.bio}</p><br />Friends:
          <ul>
          {dog.friends.map(friend => 
            <li key={friend.id}>{friend.friendName}
              <button onClick={() => deleteHandler(dog.id)}>Delete</button>
            </li>
          )}       
        </ul>      
        </div>
        <div className="prsentdiv">
          <input type="checkbox" name="present" onChange={presentHandler} checked={dog.present}/> Present</div>
        <a href="#" onClick={() => setPage("Start")}>  Go to Home Page</a>
      </div>
    </>
  );
}


export default Profile