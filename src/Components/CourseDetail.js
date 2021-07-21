import React, { useState, useEffect } from 'react';

// CourseDetail - This component provides the "Course Detail" screen by 
// retrieving the detail for a course from the REST API's /api/courses/:id 
// route and rendering the course. The component also renders a "Delete Course" 
// button that when clicked should send a DELETE request to the REST API's 
// /api/courses/:id route in order to delete a course. This component also 
// renders an "Update Course" button for navigating to the "Update Course" 
// screen.

export default function CourseDetail(props) {

  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${props.id}`)
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
      .catch(error => console.log('Error fetching api: ', error));  
  }, [props.id]);

  function getCourseJSX(course) {

    // split up the course description into separate paragraphs
    const description = course.description 
      ? course.description.split(`\n\n`)
      : [];
    const descriptionParagraphs = description.map((paragraph, index) => 
      <p key={index}>{paragraph}</p> );

    // split up the needed materials list into separate li elements
    const materials = course.materialsNeeded 
      ? course.materialsNeeded.split(`\n`)
      : [];

    // remove last item from material list if empty
    if (materials.length && !materials[materials.length - 1].length) {
      materials.pop();
    }
    const materialLis = materials.map((material, index) =>
      <li key={index}>{material.substring(2)}</li> );

    return (
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {`${course.courseUser.firstName} ${course.courseUser.lastName}`}</p>
              {descriptionParagraphs}
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {materialLis}
              </ul>
            </div>
          </div>  
        </form>
      </div>
    );
  }

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href="update-course.html">Update Course</a>
          <a className="button" href="#">Delete Course</a>
          <a className="button button-secondary" href="index.html">Return to List</a>
        </div>
      </div>      
      {
        (course.id === props.id) 
          ? getCourseJSX(course)
          : <h1>Loading...</h1>
      }
    </main>
  );
}