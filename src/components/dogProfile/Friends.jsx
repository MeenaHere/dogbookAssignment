/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { DogsContext } from "../../DogsProvider";
import { Link, useNavigate, useParams } from "react-router-dom";

function Friends() {
  const { getAll, change, getOne } = useContext(DogsContext);
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  //Fetching all dogs and setting to dogs
  useEffect(() => {
    async function fetchData() {
      try {
        const dgs = await getAll();
        setDogs(dgs);
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    }
    fetchData();
  }, [getAll]);

  // Fetch the selected dog with the given id and setting to dog
  useEffect(() => {
    async function fetchDog() {
      try {
        const d = await getOne(id);
        setDog(d);
      } catch (error) {
        console.error("Error fetching dog details:", error);
      }
    }
    fetchDog();
  }, [getOne, id]);

  // Function to handle deletion of a friend
  const deleteHandler = async (e, friendId) => {
    e.preventDefault();
    const newFriends = dog.friends.filter((friend) => friend.fId !== friendId);

    // Filter out the friend to be deleted from the dog's friends list
    const updatedDog = {
      ...dog,
      friends: newFriends,
    };

    await change(dog.id, updatedDog);
    const matchedDog = dogs.find((d) => d.id === friendId);

    // Filter out the current dog from the matched dog's friends list
    const dogFriends = matchedDog.friends.filter(
      (friend) => friend.fId !== dog.id
    );

    // If the matched dog exists, update it
    if (matchedDog) {
      const updatedMatchedDog = {
        ...matchedDog,
        friends: dogFriends,
      };

      await change(matchedDog.id, updatedMatchedDog);
    }

    setDog(updatedDog);

    // Navigate to profile page of the dog
    navigate(`/dogs/profile/${dog.id}`);
  };

  if (dog) {
    return (
      <ul className="friendList">
        {dog.friends.map((friend) => {
          const matchedDog = dogs.find((d) => d.id === friend.fId);
          if (matchedDog) {
            return (
              <li key={friend.fId} className="friend-list">
                <Link
                  to={`/dogs/profile/${matchedDog.id}`}
                  style={{ textDecoration: "none" }}
                >
                  {matchedDog.nick}
                </Link>
                <button onClick={(e) => deleteHandler(e, friend.fId)}>
                  Delete
                </button>
              </li>
            );
          }
        })}
      </ul>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default Friends;
