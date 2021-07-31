import React, { useState, useEffect } from 'react';
// import Course from './Course';


// Courses - This component provides the 'Courses' screen by retrieving the 
// list of courses from the REST API's /api/courses route and rendering a 
// list of courses. Each course needs to link to its respective 
// 'Course Detail' screen. This component also renders a link to the 
// 'Create Course' screen.

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [fetchErrorOccured, setFetchError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(response => {
        if(response.ok) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then(response => response.json())
      .then(response => { 
        setCourses(response); 
        return response;
      })
      // the debug code below will cause a dependencies warning from React
      // because we use the variable 'courses' without specifying it in the
      // dependencies array
      // .then(() => console.log('courses: ', courses))
      .catch(error => {
                        setFetchError(true);
                        console.log('Error fetching api: ', error);
                      });  
  }, []);

  // take care of the dynamic part of the page:
  function getCoursesJSX(courses, fetchErrorOccured) {
    if (courses.length > 0) {
      return courses.map(course => 
        <a key={course.id} className="course--module course--link" href={`/courses/${course.id}`}>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </a>);
    } else {
      return (fetchErrorOccured)
      ? <h1>An error occured while fetching data from the backend, please try again later.</h1>
      : <h1>Loading...</h1>;
    }
  }

  return (
    <main>
      <div className='wrap main--grid'>
        {
          // function parameters must be here or React will not re-render on state change
          getCoursesJSX(courses, fetchErrorOccured)
        }
        <a className='course--module course--add--module' href='/courses/create'>
          <span className='course--add--title'>
            <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
            viewBox='0 0 13 13' className='add'><polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon></svg>
            New Course
          </span>
        </a>
      </div>
    </main>
  );
}