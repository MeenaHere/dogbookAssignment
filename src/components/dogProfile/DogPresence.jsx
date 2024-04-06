/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { DogsContext } from "../../DogsProvider";

function DogPresence({ dog, setDog }) {
  const { change } = useContext(DogsContext);
  const [checked, setChecked] = useState(dog.present);

  // Handler for change the dogs presence when clicked
  const presentHandler = async (event) => {
    event.preventDefault();
    setChecked(!checked);
    const data = await change(dog.id, {
      ...dog,
      present: !checked,
    });
    setDog({ ...dog, present: data.present });
  };

  return (
    <div className="prsentdiv">
      <input
        type="checkbox"
        name="present"
        onChange={presentHandler}
        checked={checked}
      />{" "}
      Present
    </div>
  );
}

export default DogPresence;
