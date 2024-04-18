import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent/RegisterComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import CourseComponent from "./components/CourseComponent/CourseComponent";
import FailedComponent from "./components/FailedComponent/FailedComponent";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginComponent/>}/>
        <Route exact path="/registro" element={<RegisterComponent/>}/>
        <Route exact path="/curso" element={<CourseComponent/>}/>
        <Route exact path="/reprobados" element={<FailedComponent/>}/>
      </Routes>
    </Router>
  );
}

export default App
