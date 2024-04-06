/* eslint-disable react/prop-types */ // Disable prop-types linting for this file

import { useContext, useEffect, useState } from "react";
import { DogsContext } from "../../DogsProvider";
import { Link, useNavigate } from "react-router-dom";
import DogImage from "../dogImage/DogImage";

function Create() {
  const [dogs, setDogs] = useState([]);
  const { getAll, create, change } = useContext(DogsContext);
  const [friend, setfriend] = useState("");
  const navigate = useNavigate();

  // Fetching all dogs and setting to dogs
  useEffect(() => {
    async function main() {
      const dgs = await getAll();
      setDogs(dgs);
    }
    main();
  }, [getAll]);

  const addDog = async (event) => {
    event.preventDefault();

    // Create friend with the selected option value
    const createFriend = (friendName) => {
      if (friendName) {
        const findedDog = dogs.find((d) => d.name === friendName);
        const friend = {
          fId: findedDog.id,
        };
        return friend;
      }
    };

    // Create a dog with the form data
    const dogData = {
      name: event.target.name.value,
      nick: event.target.nick.value,
      age: event.target.age.value,
      bio: event.target.bio.value,
      present: true,
      friends: createFriend(event.target.friend.value),
    };

    // Create the new dog and add it to the dogs
    const newDog = await create(dogData);
    setDogs([...dogs, newDog]);

    // Update the selected friend's friend list to add newly created dog
    if (friend) {
      const matchedFriend = dogs.find((dog) => dog.name === friend);
      if (matchedFriend) {
        matchedFriend.friends.push({ fId: newDog.id });
        await change(matchedFriend.id, matchedFriend);
      }
    }

    // Navigate to the dogs after creating the new dg
    navigate("/dogs");
  };

  return (
    <>
      <h1 className="header cinzel">
        <Link to="/dogs" className="link">
          Dogbook🐾
        </Link>
      </h1>
      <h2 className="cinzel">Create a new dog</h2>
      <div className="section">
        <form onSubmit={addDog}>
          <DogImage />
          Name <input id="name" type="text" placeholder="Enter name" required />
          <br />
          Nickname{" "}
          <input id="nick" type="text" placeholder="Enter nickname" required />
          <br />
          Age <input type="number" id="age" placeholder="Enter age" required />
          <br />
          Bio <input id="bio" type="text" placeholder="Enter bio" required />
          <br />
          <br />
          <select
            name="friend"
            value={friend}
            onChange={(e) => setfriend(e.target.value)}
          >
            <option value="">Select a friend</option>
            {dogs.map((dog) => (
              <option key={dog.id} value={dog.name}>
                {dog.name}
              </option>
            ))}
          </select>
          <br />
          <button>Save</button>
        </form>
        <br />
        <div>
          <Link to="/dogs">
            <button className="back-link">Go to homePage</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Create;
