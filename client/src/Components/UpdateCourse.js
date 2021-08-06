import React, { useState, useEffect } from 'react';
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

export default function UpdateCourse() {

  const [course, setCourse] = useState([]);
  const [fetchErrorOccured, setFetchError] = useState(false);  
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
        setCourse(response); 
        return response;
      })
      // the debug code below will cause a dependencies warning from React
      // because we use the variable 'course' without specifying it in the
      // dependencies array
      // .then(() => console.log('course: ', course))
      .catch(error => {
        setFetchError(true);
        console.log('Error fetching api: ', error);
      });  
  }, [id]);


  function getCourseJSX(course) {
    return (
      <>
        <div>
          <label htmlFor="courseTitle">Course Title</label>
          <input id="courseTitle" name="courseTitle" type="text" defaultValue={course.title} />
          <p>By {`${course.courseUser.firstName} ${course.courseUser.lastName}`}</p>
          <label htmlFor="courseDescription">Course Description</label>
          <textarea id="courseDescription" name="courseDescription" defaultValue={course.description}>
          </textarea>
        </div>
        <div>
          <label htmlFor="estimatedTime">Estimated Time</label>
          <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={course.estimatedTime} />
          <label htmlFor="materialsNeeded">Materials Needed</label>
          <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={course.materialsNeeded}>
          </textarea>
        </div>
      </>
    );
  }

  function handleCancel(event) {
    event.preventDefault(); 
    // location.href='index.html';
  }

  function getLoadingMsg(fetchErrorOccured) {
    return (fetchErrorOccured)
    ? <h1>An error occured while fetching data from the backend, please try again later.</h1>
    : <h1>Loading...</h1>;    
  }  

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <form>
          <div className="main--flex">
            {
              // "undefined === undefined" yields true :(
              // also 'id' is a string and course.id is a number, hence the "+id":
              (course.id && (course.id === +id)) 
              //course
                ? getCourseJSX(course)
                : getLoadingMsg(fetchErrorOccured)
            } 
          </div>
          <button className="button" type="submit">Update Course</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </main>
  );
}