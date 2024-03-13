/* eslint-disable react/prop-types */
import DogImage from "./DogImage";
import dogservices from "./dogservices";


function Profile({ dog, setPage, dogs, setDogs }) {
  let checkBoxValue = dog.present ? "Absent" : "Present"  
  const presentHandler = async () => {
    const id = dog.id
    const findedDog = dogs.find((d) => d.id === dog.id);
    console.log(findedDog)
    const newDog = { ...findedDog, present: !findedDog.present };
        console.log("newDog",newDog)

    const data = await dogservices.change(id, newDog);
    console.log("data", data)
    setDogs(dogs.map((dog) => (dog.id === id ? dog : data)));
    checkBoxValue = dog.present ? "Absent" : "Present"    
  }

 
  
  const editHandler = () => {
    setPage("Edit")    
  }
  return (
    <>
      <h1 className="header">🐾Dogbook</h1>
      <div className="main">
        <div className="imgdiv">
          <DogImage />
        </div>
        <div className="infodiv">
          <p>Name: {dog.name}  <a href="#" onClick={editHandler}> Edit</a></p>
          <p>Nick: {dog.nick}</p>
          <p>Age: {dog.age}</p>
          <p>Bio: {dog.bio}</p>
          <p>Friend</p>
        </div>
        <div className="prsentdiv">
          <input type="checkbox" name="present" value={dog.present} onClick={presentHandler} defaultChecked={dog.present}/> {checkBoxValue}</div>
        <a href="#" className="homelink" onClick={() => setPage("Start")}>  Go to Home Page</a>
      </div>
    </>
  );
}


export default Profile