/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Start from "./Start";
import Profile from "./Profile";
import dogservices from "./dogservices";
import Create from "./Create";
import Edit from "./Edit";
import './App.css';


function App() {
  const [page, setPage] = useState("Start");
  const [dog, setDog] = useState({});
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    async function main() {
      const dogs = await dogservices.getAll();
      setDogs(dogs);      
    }
    main();
  }, [dog]);

  switch (page) {
    case "Start":
      return <Start dog={dog} setDog={setDog} dogs={dogs} setPage={setPage} setDogs={setDogs} />;
    case "Profile":
      return <Profile dog={dog} setPage={setPage} setDog={setDog}/>;
    case "Create":
      return <Create setPage={setPage} setDogs={setDogs} dogs={dogs} />;
    case "Edit":
      return <Edit dog={dog} setDog={setDog} setPage={setPage} dogs={dogs} setDogs={setDogs} />;
    default:
      return <Start />;
  }
}

export default App;