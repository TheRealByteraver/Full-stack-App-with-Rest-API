import React, { useState, useEffect } from 'react';
import Course from './Course';


// Courses - This component provides the "Courses" screen by retrieving the 
// list of courses from the REST API's /api/courses route and rendering a 
// list of courses. Each course needs to link to its respective 
// "Course Detail" screen. This component also renders a link to the 
// "Create Course" screen.

export default function Courses() {

  const [courses, setCourses] = useState([]);

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
      .catch(error => console.log('Error fetching api: ', error));  
  }, []);

  return (
    <main>
      <div className="wrap main--grid">
        {
          (courses.length > 0) 
          ? courses.map(course => <Course key={course.id} title={course.title} />)
          : <h1>Loading...</h1>
        }

        <a className="course--module course--add--module" href="create-course.html">
          <span className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
            New Course
          </span>
        </a>
      </div>
    </main>
  );
}