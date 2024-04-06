import Start from "./Start";
import Profile from "./components/dogProfile/Profile";
import Create from "./components/createDog/Create";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EditDog from "./components/editDog/EditDog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dogs" element={<Start />} />
        <Route path="/dogs/profile/:id" element={<Profile />} />
        <Route path="/dogs/create" element={<Create />} />
        <Route path="/dogs/edit/:id" element={<EditDog />} />
      </Routes>
    </Router>
  );
}

export default App;
