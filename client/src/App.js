import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// own imports:
import { Provider } from './Components/Context';
import PrivateRoute from './Components/PrivateRoute';
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
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
    <Provider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute path="/courses/create">
            <CreateCourse />
          </PrivateRoute>  
          <PrivateRoute path="/courses/:id/update">
            <UpdateCourse />  
          </PrivateRoute>
          <Route exact path="/courses/:id" component={CourseDetail} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut} />
          <Route component={ () =>
                <h2>404 - The requested route is not available</h2> } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;