# FULL Stack project: React frontend + express backend
### Intro
This is the final project in the Team Treehouse Tech Degree with as curriculum "Full Stack JavaScript". It consists of two parts:
* An API backend written in JavaScript using the express framework. It supports the following actions:
  * Create user (email address + password)
  * Create course (user must be authenticated)
  * Get list of available courses
  * Update an existing course (user must be authenticated, and only the original author of the course can edit his course)
  * Delete a course (user must be authenticated, and only the original author of the course can delete his course) 
### Technology
* Frontend: React + React Router + React MarkDown
* Backend: Express + sequelize as ORM

### Setup and usage
* backend (server): go to the /api folder, and run 'npm install' followed by 'npm start' to make the server listen for requests on port 5000
* frontend (client): go to the /client folder, and run 'npm install' followed by 'npm start' to start the React app, and surf to http://localhost:3000 to open the application

If you want to reset the database to its initial state, go to the /api folder and run the command 'npm run seed'.