import React, { useState, useContext, useEffect } from 'react';
import { AuthenticatedUserContext } from './Context';
import Form from './Form';
import { withRouter } from "react-router";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  // Link,
  useParams
} from "react-router-dom";


// UpdateCourse - This component provides the "Update Course" screen by 
// rendering a form that allows a user to update one of their existing 
// courses. The component also renders an "Update Course" button that when 
// clicked sends a PUT request to the REST API's /api/courses/:id route. 
// This component also renders a "Cancel" button that returns the user to 
// the "Course Detail" screen.

function UpdateCourse(props) {

  const context = useContext(AuthenticatedUserContext);

  const [course, setCourse] = useState({
    courseTitle: '',
    courseDescription: '',
    estimatedTime: '',
    materialsNeeded: '',
    courseUser: {
      firstName: '',
      lastName: '',
      emailAddress: ''
    },
    errors: []
  }); 

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        if(response.ok) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then(response => response.json())
      .then(response => { 
        setCourse({
          ...response,
          courseTitle: response.title,
          courseDescription: response.description
        }); 
        return response;
      })
      // the debug code below will cause a dependencies warning from React
      // because we use the variable 'course' without specifying it in the
      // dependencies array
      // .then(() => console.log('course: ', course))
      .catch(error => {
        console.log('Error fetching api: ', error);
      props.history.push('/error'); // todo
      });  
  }, [id, props.history]);


  function change(event) {
    const name = event.target.name;
    const value = event.target.value;

    setCourse((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }    

  function handleCancel() {
    props.history.push(`/courses/${id}`); 
  }

  async function updateCourse() {
    console.log('trying to update the course: ', course,
      '\n with user credentials: ', context.authenticatedUser);
    const response = await context.actions.api(
      `/courses/${id}`, 'PUT', 
      {
        ...course,
        title: course.courseTitle,
        description: course.courseDescription
      },
      true, context.authenticatedUser);
    console.log('http response was: ', response.status);
    if (response.status === 204) {
      // ...? stay here or return to the main route?
      // setCourse(prevState => ({ // still says 'validation error'
      //   ...prevState, errors: [ 'Successfully saved changes to the database' ] }));
      props.history.push(`/courses/${id}`); 
    }
    else if (response.status === 400) {
      const { errors } = await response.json();
      console.log('Validation error updating the course: ', errors);
      setCourse(prevState => ({ ...prevState, errors }));
    }
    else {
      // this will not catch problems if the api is unresponsive (not running for example)
      console.log('API returned an unexpected status code of ', response.status);
      setCourse(prevState => ({
        ...prevState, errors: [ `Fatal error: API returned an unexpected status code of ${response.status}` ] }));
      props.history.push('/error'); // todo
    }    
  }  
  function handleSubmit() {
    updateCourse();
  }


  const { firstName, lastName } = course.courseUser;

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <Form
          cancel={handleCancel}
          errors={course.errors}
          submit={handleSubmit}
          submitButtonText="Update Course"
          elements={() => (
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input 
                id="courseTitle" 
                name="courseTitle" 
                type="text" 
                value={course.courseTitle} 
                onChange={change} 
              />
              <p>By {`${firstName} ${lastName}`}</p>
              <label htmlFor="courseDescription">Course Description</label>
              <textarea 
                id="courseDescription" 
                name="courseDescription" 
                value={course.courseDescription}
                onChange={change} 
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input 
                id="estimatedTime" 
                name="estimatedTime" 
                type="text" 
                value={course.estimatedTime}
                onChange={change} 
              />
              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea 
                id="materialsNeeded" 
                name="materialsNeeded" 
                value={course.materialsNeeded}
                onChange={change} 
              />
            </div>
          </div>
        )} />
      </div>
    </main>
  );
}

export default withRouter(UpdateCourse);