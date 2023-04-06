import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainz from "./Auth/Mainz";
import CreateNote from "./components/CreateNote";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Mynotes from "./components/Mynotes";
import Profile from "./components/Profile";
import SingleNote from "./components/SingleNote";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/mynotes" element={<Mynotes />} />
          <Route path="/auth" element={<Mainz />} />
          <Route path="/createnote" element={<CreateNote />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/note/:id" element={<SingleNote />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
