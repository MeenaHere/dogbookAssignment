/* eslint-disable react/prop-types */
import { createContext } from "react";
import { getAll, getOne, create, change, remove } from "./dogservices";

const DogsContext = createContext();

function DogsProvider({ children }) {
  return (
    <DogsContext.Provider value={{ getAll, getOne, create, change, remove }}>
      {children}
    </DogsContext.Provider>
  );
}

export { DogsContext, DogsProvider };
