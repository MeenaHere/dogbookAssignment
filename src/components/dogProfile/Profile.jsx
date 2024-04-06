/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DogImage from "../dogImage/DogImage";
import DogDetail from "./DogDetail";
import DogPresence from "./DogPresence";
import { DogsContext } from "../../DogsProvider";

function Profile() {
  const [dog, setDog] = useState(null);
  const { getOne } = useContext(DogsContext);
  const { id } = useParams();

  // Fetch the selected dog with the given id and set it to dog state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDog = await getOne(id);
        setDog(fetchedDog);
      } catch (error) {
        console.error("Error fetching dog:", error);
      }
    };

    fetchData();
  }, [getOne, id]);

  if (dog) {
    return (
      <>
        <h1 className="header cinzel">
          <Link to="/dogs" className="link">
            Dogbook🐾
          </Link>
        </h1>
        <h2 className="cinzel">Welcome to {dog.name}&apos;s profile</h2>
        <div className="main">
          <div className="imgdiv">
            <DogImage />
          </div>
          <DogDetail dog={dog} setDog={setDog} />
          <DogPresence dog={dog} setDog={setDog} />
          <div>
            <Link to="/dogs">
              <button className="back-link">Go to homePage</button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return <div>loading</div>;
  }
}

export default Profile;
