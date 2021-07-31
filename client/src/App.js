import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// own imports:
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';

// Your app should include the following routes, listed in the format 
// path - component:
//   / - Courses
//   /courses/create - CreateCourse
//   /courses/:id/update - UpdateCourse
//   /courses/:id - CourseDetail
//   /signin - UserSignIn
//   /signup - UserSignUp
//   /signout - UserSignOut

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route path="/courses/:id/update" component={UpdateCourse} />  
        {/* <Route path="/signout" component={UserSignOut} /> */}

        <Route component={ () =>
              <h1>404 - The requested route is not available</h1> } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;