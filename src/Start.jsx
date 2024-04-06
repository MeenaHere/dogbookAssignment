/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DogImage from "./components/dogImage/DogImage";
import { DogsContext } from "./DogsProvider";

function Start() {
  const { getAll, remove } = useContext(DogsContext);
  const [dogs, setDogs] = useState([]);

  // Fetching all dogs and setting to dogs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAll();
        setDogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [getAll]);

  // Handler to delete the selected dog
  const deleteHandler = async (id) => {
    try {
      await remove(id);
      setDogs(dogs.filter((dog) => dog.id !== id));
    } catch (error) {
      console.error("Error deleting dog:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header cinzel">
        <Link to="/dogs" className="link">
          Dogbook🐾
        </Link>
      </h1>
      <h2 className="cinzel">Users</h2>
      <div className="main-profile">
        <ul className="section">
          {dogs.map((d) => (
            <li key={d.id} className="dogs-list">
              <DogImage />
              <Link
                to={`/dogs/profile/${d.id}`}
                style={{ textDecoration: "none" }}
                className={d.present ? "green" : "red"}
              >
                @{d.nick}
              </Link>
              <button onClick={() => deleteHandler(d.id)}> Delete </button>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/dogs/create">
        <button>Create a new Dog</button>
      </Link>
    </div>
  );
}

export default Start;
