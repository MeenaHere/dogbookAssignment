import { useState, useEffect } from "react";

function DogImage() {
  const [dogImg, setDogImg] = useState("");

  useEffect(() => {
    // Fetch image of random dog from the given url
    const fetchDog = async () => {
      try {
        const resp = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!resp.ok) {
          throw new Error("Failed to fetch dog image");
        }
        const dog = await resp.json();

        setDogImg(dog.message);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDog();
  }, []);

  return (
    <div>
      <img src={dogImg} alt="" width="200px" height="180px" />
    </div>
  );
}
export default DogImage;
