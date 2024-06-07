import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import CreateScreen from "./Screens/CreateScreen";
import UpdateScreen from "./Screens/UpdateScreen";
import FilterScreen from "./Screens/FilterScreen";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/create" element={<CreateScreen />}></Route>
          <Route path="/update/:id" element={<UpdateScreen />}></Route>
          <Route path="/search" element={<FilterScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
