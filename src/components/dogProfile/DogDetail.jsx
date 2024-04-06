/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Friends from "./Friends";
import { DogsContext } from "../../DogsProvider";
import { Link, useParams } from "react-router-dom";

function DogDetail() {
  const { getOne } = useContext(DogsContext);
  const [dog, setDog] = useState(null);
  const { id } = useParams();

  // Fetch the selected dog with the given id and set it to dog
  useEffect(() => {
    async function main() {
      const d = await getOne(id);
      setDog(d);
    }
    main();
  }, [id, getOne]);

  if (dog) {
    return (
      <div className="infodiv">
        <p>
          Name: {dog.name} <Link to={`/dogs/edit/${dog.id}`}>Edit</Link>
        </p>
        <p>Nick: {dog.nick}</p>
        <p>Age: {dog.age}</p>
        <p>Bio: {dog.bio}</p>
        <br />
        Friends:
        <Friends />
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}

export default DogDetail;
