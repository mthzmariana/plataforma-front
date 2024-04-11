import "./App.css";
import RegisterComponent from "./components/RegisterComponent/RegisterComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import CourseComponent from "./components/CourseComponent/CourseComponent";
import FailedComponent from "./components/FailedComponent/FailedComponent";

function App() {
  
  return (
    <div>
      <RegisterComponent></RegisterComponent>
      <LoginComponent></LoginComponent>
      <CourseComponent></CourseComponent>
      <FailedComponent></FailedComponent>
    </div>
  )
}

export default App
