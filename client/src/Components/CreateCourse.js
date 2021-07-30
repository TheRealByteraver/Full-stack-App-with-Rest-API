import React from 'react';

// CreateCourse - This component provides the "Create Course" screen by 
// rendering a form that allows a user to create a new course. The component
//  also renders a "Create Course" button that when clicked sends a POST 
//  request to the REST API's /api/courses route. This component also renders 
//  a "Cancel" button that returns the user to the default route (i.e. the 
// list of courses).

export default function CreateCourse() {

  function handleClick(event) {
    event.preventDefault(); 
    // location.href='index.html';
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div>
        <form>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input id="courseTitle" name="courseTitle" type="text" defaultValue="" />

              <p>By Joe Smith</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription"></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" defaultValue="" />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
            </div>
          </div>
          <button className="button" type="submit">Create Course</button>
          <button className="button button-secondary" onClick={handleClick}>Cancel</button>
        </form>
      </div>
    </main>
  );
}