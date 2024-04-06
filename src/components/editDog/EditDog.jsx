/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import DogImage from "../dogImage/DogImage";
import { DogsContext } from "../../DogsProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import Friends from "../dogProfile/Friends";

function EditDog() {
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState(null);
  const { getAll, getOne, change } = useContext(DogsContext);
  let friendId = null;
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetching all dogs and setting to dogs
  useEffect(() => {
    async function main() {
      const dogs = await getAll();
      setDogs(dogs);
    }
    main();
  }, [getAll]);

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

  //if dog exist then get the friendlist
  if (dog) {
    friendId = dog.friends.map((d) => d.fId);
  }

  const editDog = async (event) => {
    event.preventDefault();
    const fName = event.target.friend.value;

    //Updae the dog with the new data
    const updatedDog = await change(dog.id, dog);
    setDog(updatedDog);

    // Update the friend list
    if (fName) {
      const friendDog = dogs.find((d) => d.name === fName);
      if (friendDog) {
        // Add the current dog to the selected friend's friend list
        const updatedFriendDog = {
          ...friendDog,
          friends: [...friendDog.friends, { fId: dog.id }],
        };
        await change(friendDog.id, updatedFriendDog);

        // Add the selected friend to the current dog's friend list
        dog.friends.push({ fId: friendDog.id });
        await change(dog.id, dog);
      }
    }
    // Navigate to the dog's profile page
    navigate(`/dogs/profile/${dog.id}`);
  };
  if (dog) {
    return (
      <>
        <h1 className="header cinzel">
          <Link to="/dogs" className="link">
            Dogbook🐾
          </Link>
        </h1>
        <h2 className="cinzel">Edit {dog.name}&apos;s Deatails</h2>
        <div className="section">
          <form onSubmit={editDog}>
            <DogImage />
            <div className="form-group">
              Name{" "}
              <input
                type="text"
                id="name"
                value={dog.name}
                onChange={(e) => setDog({ ...dog, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              Nickname{" "}
              <input
                type="text"
                id="nick"
                value={dog.nick}
                onChange={(e) => setDog({ ...dog, nick: e.target.value })}
              />
            </div>
            <div className="form-group">
              Age{" "}
              <input
                type="text"
                id="age"
                value={dog.age}
                onChange={(e) => setDog({ ...dog, age: e.target.value })}
              />
            </div>
            <div className="form-group">
              Bio{" "}
              <input
                type="text"
                id="bio"
                value={dog.bio}
                onChange={(e) => setDog({ ...dog, bio: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Friends:</label>
              <Friends />
            </div>
            <div className="form-group">
              <label>Select a friend:</label>
              <select name="friend" id="friend">
                <option value="">Select a friend</option>
                {dogs.map((d) => {
                  if (d.id !== dog.id && !friendId.includes(d.id)) {
                    return (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <button>Save</button>
          </form>
          <div>
            <Link to="/dogs">
              <button className="back-link">Go to homePage</button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    <div>loading</div>;
  }
}

export default EditDog;
