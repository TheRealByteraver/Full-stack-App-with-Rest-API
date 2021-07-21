// import logo from './logo.svg';
// import './App.css';

// own imports:
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';


function App() {

  return (
    <div>
      <Header />
      {/* <Courses /> */}
      {/* <CourseDetail id={1} /> */}
      {/* <UserSignIn /> */}
      {/* <UserSignUp /> */}
      {/* <CreateCourse /> */}
      <UpdateCourse id={1}/>
    </div>
  );
}

export default App;